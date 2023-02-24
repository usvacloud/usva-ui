export default function NoScriptScreen() {
    return (
        <noscript>
            <div
                style={{
                    zIndex: 1000000,
                    position: "fixed",
                    top: "0%",
                    left: "0%",
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    padding: "50px",
                    margin: 0,
                    boxSizing: "border-box",
                    background: "hsl(150, 20%, 30%)",
                    color: "hsl(150, 50%, 80%)",
                    fontFamily: "Open Sans, sans-serif",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "min(90%, 1200px)",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 25,
                        }}
                    >
                        Oops! This site is not usable without JavaScript enabled!
                    </h1>
                    <p>
                        We know it&apos;s uncomfortable to keep JavaScript on, but this site highly relies on
                        custom processes to enhance user experience.
                    </p>
                    <form action="">
                        <button
                            style={{
                                marginTop: "30px",
                                background: "none",
                                cursor: "pointer",
                                color: "hsl(150, 50%, 90%)",
                                border: "1px solid hsl(150, 20%, 60%)",
                                borderRadius: "50px",
                                padding: "10px 20px",
                            }}
                        >
                            I enabled javascript, reload this page
                        </button>
                    </form>
                </div>
            </div>
        </noscript>
    )
}
