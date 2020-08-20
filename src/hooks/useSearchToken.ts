import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { useAppState } from '../state';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import useVideoContext from './useVideoContext/useVideoContext';
import { TokenClass } from 'typescript';

export default function useSearchToken() {
  const { setUserName, setRoomName } = useAppState();
  const { connect } = useVideoContext();

  const location = useLocation<{ from: Location }>();

  var queryString = location.search?.substring(1);

  useEffect(() => {
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
    }

    const identity = params['identity'];
    if (identity) {
      setUserName(identity);
    }

    if (token) {
      if (!window.location.origin.includes('twil.io')) {
        window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
      }
      connect(token);
    }
  }, [queryString]);
}
