import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StreamingService from '../StreamingService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontWeight: 'bold',
  },
  service: {
    marginBottom: theme.spacing(2),
  },
}));

const StreamingWhere = ({ streamingInfo }) => {
  const classes = useStyles();
  const [streamingService, setStreamingService] = useState(null);

  useEffect(() => {
    if (streamingInfo) {
      // Check if the streaming service is Netflix, HBO, Prime Video, Apple TV+, or Disney+
      if (streamingInfo.netflix) {
        setStreamingService('netflix');
      } else if (streamingInfo.hbo) {
        setStreamingService('hbo');
      } else if (streamingInfo.prime) {
        setStreamingService('prime');
      } else if (streamingInfo.apple) {
        setStreamingService('apple');
      } else if (streamingInfo.disney) {
        setStreamingService('disney');
      } else {
        setStreamingService(null);
      }
    } else {
      setStreamingService(null);
    }
  }, [streamingInfo])
  console.log(streamingInfo);

  return (
    <div className={classes.root}>
      <h2 className="mb-5">Where it's streaming:</h2>
      {streamingService && (
<StreamingService name={streamingService} />
      )}
    </div>
  );
};

export default StreamingWhere;
