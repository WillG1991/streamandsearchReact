import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import netflixIcon from "../../assets/img/netflix.png"
import hboIcon from "../../assets/img/hbo.png"
import disneyIcon from "../../assets/img/disney.png"
import amazonIcon from "../../assets/img/amazon.png"
import appleIcon from "../../assets/img/apple.png"
import huluIcon from "../../assets/img/hulu.png"
import showtimeIcon from "../../assets/img/showtime.png"
import paramountIcon from "../../assets/img/paramount.png"
import otherIcon from "../../assets/img/other.png"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    flexDirection: 'column', // added to center icon and text vertically
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: theme.spacing(0.5), // added to separate icon from text
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textAlign: 'center', // added to center the text horizontally
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
        return appleIcon;
      case 'hbo':
        return hboIcon;
      case 'hulu':
        return huluIcon;
        case 'showtime':
          return showtimeIcon;
          case 'paramount':
            return paramountIcon;
      default:
        return otherIcon;
    }
  };

  const iconSrc = getIcon(name);

  return (
    <div className={classes.root}>
      <a href={link} target="_blank" rel="noreferrer" className={classes.link}>
        <img src={iconSrc} className={classes.icon} alt={`${name} logo`} />
        <Typography variant="body1">
          Available on {name}
        </Typography>
      </a>
    </div>
  );
};

export default StreamingService;
