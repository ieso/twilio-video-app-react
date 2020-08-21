import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { useAppState } from '../state';
import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import useVideoContext from './useVideoContext/useVideoContext';
import { ContactlessOutlined } from '@material-ui/icons';

export default function useSearchToken() {
  const { setUserName, setRoomName, setProvidedToken, isFetching } = useAppState();
  const { isConnecting, connect, isAcquiringLocalTracks, localTracks } = useVideoContext();

  const [connecting, setConnecting] = useState(false);

  const location = useLocation<{ from: Location }>();

  var queryString = location.search?.substring(1);
  const isReadyToConnect = (!isAcquiringLocalTracks && localTracks.length && !isConnecting) || isFetching || connecting;

  useEffect(() => {
    if (!isReadyToConnect) return;
    if (!queryString) return;

    var params: any = {};
    queryString.split('&').forEach(query => {
      const [key, val] = query.split('=');
      if (key && val) {
        params[key] = decodeURI(val);
      }
    });

    const token = params['token'];

    var roomName;
    if (token) {
      const decodedToken: any = jwt.decode(token);
      console.log('decodedToken', decodedToken);
      roomName = decodedToken?.grants?.video?.room;
      if (roomName) setRoomName(roomName);
      setProvidedToken(token);
    }

    const identity = params['identity'];
    if (identity) {
      setUserName(identity);
    }

    if (token && !isAcquiringLocalTracks) {
      if (!window.location.origin.includes('twil.io')) {
        window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
      }
      setConnecting(true);
      connect(token);
    }
  }, [queryString, isReadyToConnect]);
}
