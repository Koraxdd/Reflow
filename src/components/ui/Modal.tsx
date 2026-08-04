import { type ReactNode } from "react"

type Props = {
    children: ReactNode
    onClose: () => void
}

export default function Modal({ children, onClose }: Props) {
    return (
        <>
            <div
                className="fixed inset-0 backdrop-blur-sm bg-black/50"
                onClick={onClose}
            />
            <div className="fixed inset-0 flex justify-center pointer-events-none items-center z-50 px-4">
                <div className="pointer-events-auto">{children}</div>
            </div>
        </>
    )
}
