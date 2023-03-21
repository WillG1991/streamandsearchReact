import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


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

const StreamingWhere = ({ title, children }) => {
  const classes = useStyles();
  const [streamingData, setStreamingData] = useState([]);


  return (
    <section className="testimonials streamingWhere text-center bg-dark">
    <div className="column">
    <h2 className="mb-5">Where it's streaming:</h2>
    <div id="button-remove" className="columns">
    <StreamingService title={title} service="Netflix" streamingData={streamingData} />
    <StreamingService title={title} service="Prime" streamingData={streamingData} />
    <StreamingService title={title} service="Disney" streamingData={streamingData} />
    <StreamingService title={title} service="Apple" streamingData={streamingData} />
    <StreamingService title={title} service="Hulu" streamingData={streamingData} />
    <StreamingService title={title} service="HBO" streamingData={streamingData} />
    </div>
    {children && children(streamingData)}
    </div>
    </section>
    );
    };
    
    const StreamingService = ({ title, service, streamingData }) => {
    const [streamingInfo, setStreamingInfo] = useState(null);
    
    useEffect(() => {
    setStreamingInfo(streamingData.find(loc => loc.name.toLowerCase().includes(service.toLowerCase())));
    }, [service, streamingData]);
    
    return (
    <div className="col-lg-2">
    <div className="testimonial-item mx-auto mb-5 mb-lg-0 iconSmaller">
    <img src={`./assets/img/${service.toLowerCase()}.svg`} className="img-fluid rounded-circle mb-3" alt="..." />


<div className="column is-size-5 is-underlined">
    {service}:
    <div className="streamingNetflix">
    {streamingInfo ? (
    <a href={streamingInfo.url} target="_blank" rel="noopener noreferrer">
    {streamingInfo.display_name}
    </a>
    ) : (
    ''
    )}
    </div>
    </div>
    </div>
    </div>
    );
    };
    
    export default StreamingWhere;

