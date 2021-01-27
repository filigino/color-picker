const styles = {
    root: {
        height: '100%'
    },
    navbar: {
        height: '5%'
    },
    colors: {
        height: '90%'
    },
    footer: {
        height: '5%'
    },
    backBox: {
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
        textTransform: 'uppercase',
        width: '20%',
        '& a': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontSize: '1rem',
            height: '30px',
            lineHeight: '30px',
            margin: '0 auto',
            textAlign: 'center',
            width: '100px'
        },
        '&:hover': {
            color: 'white'
        }
    }
};

export default styles;
