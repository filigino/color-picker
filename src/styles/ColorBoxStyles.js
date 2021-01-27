import chroma from 'chroma-js';

const styles = {
    colorBox: {
        display: 'inline-block',
        height: props => props.isSingleColor ? '50%' : '25%',
        position: 'relative',
        width: '20%'
    },
    background: {
        backgroundColor: props => props.backgroundColor,
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    buttonBox: {
        backgroundColor: 'transparent',
        border: 'none',
        height: '100%',
        outline: 'none',
        padding: 0,
        position: 'relative',
        textTransform: 'uppercase',
        width: '100%',
        '&:focus': {
            outline: 'none'
        },
        '&:hover div': {
            opacity: 1,
            transition: '0.5s'
        }
    },
    copyButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? 'rgba(0, 0, 0. 0.6)' : 'white',
        fontSize: '1rem',
        height: '30px',
        lineHeight: '30px',
        margin: '0 auto',
        opacity: 0,
        textAlign: 'center',
        width: '100px',
    },
    copyOverlay: {
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(50)',
        zIndex: '1'
    },
    copyOverlayTextActive: {
        alignItems: 'center',
        bottom: '0',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '4rem',
        justifyContent: 'center',
        left: '0',
        opacity: '1',
        position: 'fixed',
        right: '0',
        top: '0',
        transform: 'scale(1)',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.1s',
        zIndex: '1',
        '& h1': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontWeight: '400',
            marginBottom: '0',
            padding: '1rem',
            textAlign: 'center',
            textShadow: '1px 2px black',
            textTransform: 'uppercase',
            width: '100%'
        },
        '& p': {
            color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? 'black' : 'white',
            fontSize: '2rem',
            fontWeight: '100',
        }
    },
    copyOverlayTextInActive: {
        color: 'black',
        opacity: 0,
        position: 'absolute',
    },
    moreButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        bottom: '0',
        color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? 'black' : 'white',
        padding: '10px',
        position: 'absolute',
        right: '0',
        textDecoration: 'none',
        textTransform: 'uppercase',
        '&:hover': {
            color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? 'black' : 'white'
        }
    },
    name: {
        bottom: '0',
        color: props => chroma(props.backgroundColor).luminance() <= 0.1 ? 'white' : 'black',
        fontSize: '12px',
        letterSpacing: '1px',
        padding: '10px',
        position: 'absolute',
    }
};

export default styles;
