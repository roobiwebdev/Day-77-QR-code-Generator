import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const QrCodePage = () => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = localStorage.getItem('url');
    console.log('URL from localStorage:', url);

    if (url && qrCodeRef.current) {
      const canvas = document.createElement('canvas');
      const size = 250;
      canvas.width = size;
      canvas.height = size;

      QRCode.toCanvas(canvas, url, { errorCorrectionLevel: 'H' }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
        } else {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#8e44ad'); 
            gradient.addColorStop(1, '#3498db'); 

            const imageData = ctx.getImageData(0, 0, size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0 && data[i + 3] === 255) {
               
                ctx.fillStyle = gradient;
                ctx.fillRect((i / 4) % size, Math.floor((i / 4) / size), 1, 1);
              }
            }

            qrCodeRef.current!.innerHTML = '';
            qrCodeRef.current!.appendChild(canvas);
          }
        }
      });
    } else {
      console.error('Invalid URL or qrCodeRef is null');
    }
  }, [qrCodeRef]);

  const handleDownload = () => {
    const canvas = qrCodeRef.current!.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      link.click();
    }
  };

  const handleShare = () => {
    const canvas = qrCodeRef.current!.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const filesArray = [new File([blob], 'qrcode.png', { type: blob.type })];
          if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
              files: filesArray,
              title: 'QR Code',
              text: 'Check out this QR code!',
            })
            .then(() => console.log('QR code shared successfully'))
            .catch((error) => console.error('Error sharing QR code:', error));
          } else {
            console.error('Web Share API is not supported or sharing files is not supported.');
          }
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="absolute top-12 cursor-pointer">
        <img src="/Logo.svg" alt="Logo" />
      </div>
      <div className="w-72 h-72 border rounded-full flex flex-col-reverse justify-center items-center bg-[#F8FAFC1A]">
        <div className="w-60 h-60 flex justify-center items-center bg-white rounded-3xl">
          <div className="w-48 h-48 flex justify-center items-center" ref={qrCodeRef}></div>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center mt-10">
        <button onClick={handleDownload} className="py-3 px-7 text-white border font-semibold rounded-xl bg-[#263FA9] outline-none border-none flex gap-3 justify-center items-center">
          Download <img src="/Load_circle_duotone.svg" alt="Download" />
        </button>
        <button onClick={handleShare} className="py-3 px-8 text-white border font-semibold rounded-xl bg-[#263FA9] outline-none border-none flex gap-3 justify-center items-center">
          Share <img src="/link_alt.svg" alt="Share" />
        </button>
      </div>
    </div>
  );
};

export default QrCodePage;
