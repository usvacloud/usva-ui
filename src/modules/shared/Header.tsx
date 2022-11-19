import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react"

export default function Header(props: {
    title: string
    endChar?: string
    description?: string | null
    bigHeader?: boolean
}) {
    function Title({ children, className }: { children: JSX.Element[]; className: string }) {
        if (props.bigHeader) return <h1 className={className}>{children}</h1>
        else return <h2 className={className}>{children}</h2>
    }
    return (
        <>
            <div className="header">
                <Title className={`title ${props.bigHeader ? "primary" : ""}`}>
                    <>{props.title}</>
                    <span className="special">{props.endChar ?? "."}</span>
                </Title>
                {props.description && <h3 className="description">{props.description}</h3>}
            </div>
        </>
    )
}
