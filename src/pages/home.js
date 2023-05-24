import React from "react";

function Home() {
    const displayname = sessionStorage.getItem("displayname");
    return (
        <div style={{backgroundColor: "#f2f2f2", padding: "20px"}}>
            <img src={require(`../favicon.png`)} alt="image" width="200" height="200" /><br></br><br></br>
            <label style={{ color: "#333", fontSize: "18px" }}>
                : เข้าสู่ระบบโดย {displayname}
            </label>
        </div>
    );
}

export default Home;