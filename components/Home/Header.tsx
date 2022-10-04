export default function Header(props: {
    title: string,
    description: string|null,
}) {
    return <>
        <div className="header">
            <h1 className="title primary">
                {props.title}
                <span className="special">.</span>
            </h1>
            <h3 className="description">{props.description}</h3>
        </div>
    </>
}