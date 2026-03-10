import { RxCross2 } from "react-icons/rx";

import "./Chat.scss";

function Chat() {
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="messageBox">
          <div className="message">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt=""
            />
            <p>Lorem Ipsum is simply dummy text of the</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt=""
            />
            <p>printing and typesetting industry.</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt=""
            />
            <p>Lorem Ipsum is simply dummy text of the</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt=""
            />
            <p>printing and typesetting industry.</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt=""
            />
            <p>Lorem Ipsum is simply dummy text of the</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt=""
            />
            <p>printing and typesetting industry.</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt=""
            />
            <p>Lorem Ipsum is simply dummy text of the</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt=""
            />
            <p>printing and typesetting industry.</p>
          </div>
        </div>
      </div>

      <div className="chatBox">
        <div className="header">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt=""
            />
            <span>Noah Anderson</span>
          </div>
          <RxCross2 className="close" />
        </div>

        <div className="body">
          <div className="chatMessage">
            <p>Lorem Ipsum is simply dummy text of the</p>
            <span>1 hour ago</span>
          </div>

          <div className="chatMessage Self">
            <p>printing and typesetting industry.</p>
            <span>1 hour ago</span>
          </div>

          <div className="chatMessage">
            <p>Lorem Ipsum is simply dummy text of the</p>
            <span>1 hour ago</span>
          </div>

          <div className="chatMessage Self">
            <p>printing and typesetting industry.</p>
            <span>1 hour ago</span>
          </div>

          <div className="chatMessage">
            <p>Lorem Ipsum is simply dummy text of the</p>
            <span>1 hour ago</span>
          </div>

          <div className="chatMessage Self">
            <p>printing and typesetting industry.</p>
            <span>1 hour ago</span>
          </div>
        </div>

        <div className="footer">
          <textarea></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
