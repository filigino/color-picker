const styles = {
    navbar: {
        alignItems: 'center',
        display: 'flex',
        height: '6vh',
    },
    logo: {
        alignItems: 'center',
        backgroundColor: '#eceff1',
        display: 'flex',
        fontFamily: 'Roboto',
        fontSize: '22px',
        height: '100%',
        marginRight: '15px',
        padding: '0 13px',
        '& a': {
            color: 'black',
            textDecoration: 'none'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    },
    slider: {
        display: 'inline-block',
        margin: '0 10px',
        width: '340px',
        '& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:active, .rc-slider-handle:focus':
        {
            backgroundColor: 'green',
            border: '2px solid green',
            height: '13px',
            marginLeft: '-7px',
            marginTop: '-3px',
            width: '13px',
        },
        '& .rc-slider-rail': {
            height: '8px'
        },
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        }
    }
};

export default styles;
