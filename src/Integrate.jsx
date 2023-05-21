import  Header  from "./layout/Header";
import Chat   from "./components/chat/Chat";
import  Footer  from "./layout/Footer";

export default function Integrate() {
    return (
        <div><Header username={username} setUsername={setUsername} />
            <Chat username={username} />
            <Footer username={username} />
        </div>
    )
};
