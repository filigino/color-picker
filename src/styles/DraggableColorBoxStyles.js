const styles = {
    root: {
        backgroundColor: props => props.color,
        cursor: 'pointer',
        display: 'inline-block',
        height: '25%',
        position: 'relative',
        width: '20%',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        bottom: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        fontSize: '12px',
        justifyContent: 'space-between',
        left: 0,
        letterSpacing: '1px',
        padding: '10px',
        position: 'absolute',
        textTransform: 'uppercase',
        width: '100%'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}

export default styles
