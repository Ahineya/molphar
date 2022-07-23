import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const BuilderLayoutIframe = ({ children }) => {
	const [iframeRef, setIframeRef] = useState(null);
	const [tailwindLoaded, setTailwindLoaded] = useState(false);
	const mountNode = iframeRef?.contentWindow?.document?.body;

	useEffect(() => {
		const throwMouseDown = (e) => {
			console.log("throwMouseDown");
			const event = new Event('editorMouseDown', { bubbles: true });
			document.dispatchEvent(event);
		}

		if (mountNode) {
				const script = iframeRef?.contentWindow?.document.createElement("script");
				script.onload = () => {
					setTailwindLoaded(true);
				};
				script.src = "https://cdn.tailwindcss.com";
				iframeRef?.contentWindow?.document?.head?.appendChild(script);

				iframeRef.contentWindow.addEventListener('mousedown', throwMouseDown, true);
		}

		return () => {
			iframeRef?.contentWindow?.removeEventListener('mousedown', throwMouseDown, true);
		}
	}, [mountNode]);

	return (
		<iframe className="w-full h-full border-none" ref={setIframeRef}>
			{mountNode && createPortal(tailwindLoaded ? children : null, mountNode)}
		</iframe>
	)
}
