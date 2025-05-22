'use client';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

export default function ShareModal({ link }: { link: string }) {
  const title = 'Olha só esse conteúdo!';

  return (
    <div className="d-flex gap-3">
      <FacebookShareButton url={link} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton url={link} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <TwitterShareButton url={link} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}
