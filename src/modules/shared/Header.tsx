export default function Header(props: { title: string; endChar?: string; description?: string | null }) {
    return (
        <>
            <div className="header">
                <h1 className="title primary">
                    {props.title}
                    <span className="special">{props.endChar ?? "."}</span>
                </h1>
                {props.description && <h3 className="description">{props.description}</h3>}
            </div>
        </>
    )
}
