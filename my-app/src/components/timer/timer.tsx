import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Timer = ({start, handleRetry, stop}:any) => { 
    const [second, setSecond] = useState(start)

    useEffect(() => {
        if (second > 0 && !stop){
            setTimeout(() => setSecond(second - 1), 1000)
            return
        }
        if (second === 0){
            handleRetry(false)
        }
    })

    if(second === 0){
        return <Button onClick={() => handleRetry(true)}>Попробовать еще раз</Button>
    }

    if(stop){
        return null
    }
    return (
        <div>{second}</div>
    )
}

export default Timer