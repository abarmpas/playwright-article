
import React from "react"

const StatusPill = (issue: { status: string}) => {
    if (!issue) return null;

    return (
        <div className={`w-16 py-2 px-2 no-underline rounded-md font-semibold bg-blue text-black text-center text-xs ${issue?.status === 'OPEN' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} `}>
            {issue?.status}
        </div>
    )
}

export default StatusPill