import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import netflixIcon from "../../assets/img/netflix.png"
import hboIcon from "../../assets/img/hbo.png"
import disneyIcon from "../../assets/img/disney.png"
import amazonIcon from "../../assets/img/amazon.png"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    width: 30,
    height: 30,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const StreamingService = ({ name, link }) => {
  const classes = useStyles();

  const getIcon = (serviceName) => {
    switch (serviceName.toLowerCase()) {
      case 'netflix':
        return netflixIcon;
      case 'prime':
        return amazonIcon;
      case 'disney':
        return disneyIcon;
      case 'apple':
        return '/assets/img/apple-tv.svg';
      case 'hbo':
        return hboIcon;
      case 'showtime':
        return '/assets/img/showtime.svg';
      case 'paramount':
        return '/assets/img/paramount-plus.svg';
      default:
        return null;
    }
  };

  const iconSrc = getIcon(name);

  return (
    <div className={classes.root}>
      <img src={iconSrc} className={classes.icon} alt={`${name} logo`} />
      <Typography variant="body1">
        Available on{' '}
        <a href={link} target="_blank" rel="noreferrer" className={classes.link}>
          {name}
        </a>{' '}
        in the US
      </Typography>
    </div>
  );
};

export default StreamingService;
