import { useEffect, useState } from "react"

export default function Bar() {
    return <div className="bar">
        <div className="content">
            <a href="/">Usva</a>

            <div className="links">
                <a href="/join-the-community" className="animated">Join the community</a>
                <a href="/download-file" className="animated">Download a file</a>
                <a href="/support" className="animated">Support</a>
            </div>
        </div>
    </div>
}