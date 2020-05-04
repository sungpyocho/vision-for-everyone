import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import kiweAvatar from '../../../assets/kiwe-green.png';
import UserAvatar from '../../../assets/kiwe-lime.png';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    avatar: {
        display: 'inline-block',
    },
  }));


const Message = (props) => {
    const classes = useStyles();
    const AvatarSrc = props.who === 'kiwe' ? kiweAvatar : UserAvatar;

    return (
        <MessageComponent who={props.who}>
            <div>
                <Avatar alt={props.who} src={AvatarSrc} className={classes.avatar}/>
            </div>
            <MessageBox who={props.who}>
                <span>{props.text}</span>
            </MessageBox>
        </MessageComponent>
    )
}

const MessageComponent = styled.div`
    text-align: ${props => props.who === "kiwe" ? "left": "right"};
    padding: 5px;
`

const MessageBox = styled.div`
	max-width: 60%;
	margin: 2px 14px;
	width: inherit;
	overflow-wrap: break-word;
	padding: 7px 20px;
	display: inline-block;
	font-size: 16px;
	word-spacing: 0.3px;
    background: ${props => props.who === "kiwe" ? "white": "#6ac48a"};
	color: ${props => props.who === "kiwe" ? "black": "white"};
    border-top-left-radius: ${props => props.who === "kiwe" ? 0: "10px"}; 
    border-top-right-radius: ${props => props.who === "kiwe" ? "10px" : 0};  
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: start;
`;


export default Message;