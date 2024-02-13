import React, { useCallback, useEffect, useState } from 'react'
import LiveCursor from './cursor/LiveCursor'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat';
import { CursorMode } from '@/types/type';

const Live = () => {
    const others = useOthers();

    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const [cursorState, setCursorState] = useState({
        mode: CursorMode.Hidden,

    })
    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });

    }, []);

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({mode : CursorMode.Hidden})
        updateMyPresence({ cursor: null, message: null });

    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });

    }, []);

    useEffect(()=>{
        // const onKeyU
    },[])

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className='h-[100vh] text-center w-full flex justify-center items-center border-2 border-green-500'
        >

            {cursor && (<CursorChat
                cursor={cursor}
                cursorState = {cursorState}
                setCursorState = {setCursorState}
                updateMyPresence = {updateMyPresence}
            />)}

            <LiveCursor others={others} />


        </div>
    )
}

export default Live
