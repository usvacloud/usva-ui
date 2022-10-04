import Header from "@/components/Home/Header";

function LinkWithLabel(props: {
    link: string,
    label: string,
    linktext: string,
    linkclass: string|null
}) {
    return <div className="linkwithlabel">
        <span>{props.label}</span>
        <a className={props.linkclass||""} href={props.link}>{props.linktext}</a>
    </div>
}

export default function Footer() {
    return <div className="footer">
        <Header
            title="End of introduction"
            description={null}
        />

        <div className="links">
            <div className="linksContainer contacts">
                <LinkWithLabel 
                    link="mailto:sec@usva.cc"
                    linktext="sec@usva.cc"
                    linkclass="mail"
                    label="Security Contact"
                />
                <LinkWithLabel 
                    link="mailto:collaboration@usva.cc"
                    linktext="collaboration@usva.cc"
                    linkclass="mail"
                    label="Collaboration"
                />
            </div>
            <div className="linksContainer legal">
                <a href="">Terms of Service</a>
                <a href="">Privacy Policy</a>
            </div>
        </div>
    </div>
}