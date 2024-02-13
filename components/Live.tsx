import React, { useCallback } from 'react'
import LiveCursor from './cursor/LiveCursor'
import { useMyPresence, useOthers } from '@/liveblocks.config'

const Live = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY  - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor: {x,y}});

    }, []);

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault();


        updateMyPresence({cursor: null, message : null});

    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY  - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor: {x,y}});

    }, []);

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className='h-[100vh] text-center w-full flex justify-center items-center border-2 border-green-500'
        >
            <LiveCursor others={others} />
        </div>
    )
}

export default Live
