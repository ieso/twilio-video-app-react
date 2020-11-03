import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CallEnd from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function EndCallButton() {
  const classes = useStyles();
  const { room } = useVideoContext();

  const appointmentGuid = room?.name.replaceAll(/^Appointment:/g, '');

  return (
    <Tooltip
      title={'End Call'}
      onClick={() => {
        room.disconnect();
        window.open('', '_parent', '')?.close();
        // window. close();
        window.location.href = 'https://login.iesohealth.uk/';
      }}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
