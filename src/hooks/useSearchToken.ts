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

    if (token) {
      const decodedToken: any = jwt.decode(token);
      console.log('decodedToken', decodedToken);
      const roomName = decodedToken?.grants?.video?.room;
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

    //parse the jwt token
    //pull out room name
  }, [queryString]);
}

/*

http://localhost:3000/?identity=alan&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzU0MzUzMDQ2MDAzM2Q1YzhmYjU3YmVhNGVmNjgzYzA5LTE1OTc5MjczNTEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJUIDFmd2Z3ZiIsInZpZGVvIjp7InJvb20iOiJBcHBvaW50bWVudDo0M2U0MmI5Yy1jMjE2LTQ4NmMtYWNmZi01NjU2YmIzYjYwMDgifX0sImlhdCI6MTU5NzkyNzM1MSwiZXhwIjoxNTk3OTQxNzUxLCJpc3MiOiJTSzU0MzUzMDQ2MDAzM2Q1YzhmYjU3YmVhNGVmNjgzYzA5Iiwic3ViIjoiQUMzNGY0Mjc1ODhmNjgxZmFhOWI0ZGVhMzU5NTZkNTU1OCJ9.nsX3ahA9qcnCZ37nhq5fMvvfVgH_ShnYKWx-hkVzcew




*/

const aaa = {
  id: 0,
  isStateEditable: true,
  name: 'State',
  value:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzU0MzUzMDQ2MDAzM2Q1YzhmYjU3YmVhNGVmNjgzYzA5LTE1OTc5MjczNTEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJUIDFmd2Z3ZiIsInZpZGVvIjp7InJvb20iOiJBcHBvaW50bWVudDo0M2U0MmI5Yy1jMjE2LTQ4NmMtYWNmZi01NjU2YmIzYjYwMDgifX0sImlhdCI6MTU5NzkyNzM1MSwiZXhwIjoxNTk3OTQxNzUxLCJpc3MiOiJTSzU0MzUzMDQ2MDAzM2Q1YzhmYjU3YmVhNGVmNjgzYzA5Iiwic3ViIjoiQUMzNGY0Mjc1ODhmNjgxZmFhOWI0ZGVhMzU5NTZkNTU1OCJ9.nsX3ahA9qcnCZ37nhq5fMvvfVgH_ShnYKWx-hkVzcew',
  subHooks: [],
};
