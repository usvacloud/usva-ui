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
        <div className="content">
            <Header
                title="More information"
                description={null}
            />

            <div className="links">
                <div className="linksContainer contacts">
                    <h2 className="title">Contacts</h2>
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
                    <h2 className="title">Legal</h2>
                    <a className="animated" href="/terms-of-service">Terms of Service</a>
                    <a className="animated" href="/privacy-policy">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
}