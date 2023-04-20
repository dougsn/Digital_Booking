import { ShareNetwork } from "@phosphor-icons/react";
import { useState } from "react";
import "./styles.css";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const ShareSocialButton = ({ name, description }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <ShareNetwork size={24} color="#383b58" />
      </button>

      <div
        className={`popover ${
          showTooltip ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-500 ease-in-out`}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="popover-arrow" />
        <div className="popover-content">
          <FacebookShareButton
            url={window.location.href}
            quote={name + "\n" + description}
            onClick={() => setShowTooltip(false)}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={name}
            onClick={() => setShowTooltip(false)}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <TelegramShareButton
            url={window.location.href}
            title={name}
            onClick={() => setShowTooltip(false)}
          >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <WhatsappShareButton
            url={window.location.href}
            title={name}
            onClick={() => setShowTooltip(false)}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};
