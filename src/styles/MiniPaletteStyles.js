const styles = {
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        '&:hover svg': {
            opacity: 1
        }
    },
    colors: {
        backgroundColor: '#dae1e4',
        borderRadius: '5px',
        height: '150px',
        width: '100%',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColorBox: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        marginBottom: '-3.5px'
    },
    deleteIcon: {
        backgroundColor: '#eb3d30',
        color: 'white',
        height: '30px',
        opacity: 0,
        padding: '5px',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '30px'
    }
};

export default styles;
