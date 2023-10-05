import { useState, useEffect, useRef } from "react";
import ClipboardJS from 'clipboard';

function Shape() {
    const [topLeft, setTopLeft] = useState('');
    const [topRight, setTopRight] = useState('');
    const [bottomRight, setBottomRight] = useState('');
    const [bottomLeft, setBottomLeft] = useState('');
    const textareaRef = useRef(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const clipboard = new ClipboardJS('.copy-button', {
            target: () => textareaRef.current,
        });

        clipboard.on('success', () => {
            setIsCopied(true);
        });

        return () => {
            clipboard.destroy();
        };
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = value === '' ? '' : parseInt(value, 10);

        if (!isNaN(numericValue) && numericValue >= 0) {
            switch (name) {
                case 'topLeft':
                    setTopLeft(numericValue);
                    break;
                case 'topRight':
                    setTopRight(numericValue);
                    break;
                case 'bottomRight':
                    setBottomRight(numericValue);
                    break;
                case 'bottomLeft':
                    setBottomLeft(numericValue);
                    break;
                default:
                    break;
            }
        }
    };

    const handleButtonClick = () => {
        setIsButtonClicked(true);
        setIsCopied(false);

        setTimeout(() => {
            setIsCopied(false);
        }, parseInt("#{ $animation-duration}".replace('ms', '')));
    }


    const cssCode = `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;\n-webkit-border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;

    return (
        <div className="Shape">
            <div className="Shape__settings">
                <div className="Shape__settings__inputs">
                    <div className="Shape__settings__inputs__topLeft">
                        <label>Top Left:</label>
                        <input
                            type="number"
                            name="topLeft"
                            value={topLeft}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="Shape__settings__inputs__topRight">
                        <label>Top Right:</label>
                        <input
                            type="number"
                            name="topRight"
                            value={topRight}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="Shape__settings__inputs__bottomLeft">
                        <label>Bottom Left:</label>
                        <input
                            type="number"
                            name="bottomLeft"
                            value={bottomLeft}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="Shape__settings__inputs__bottomRight">
                        <label>Bottom Right:</label>
                        <input
                            type="number"
                            name="bottomRight"
                            value={bottomRight}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div
                    className="Shape__settings__shape">
                    <div className="Shape__settings__shape__preview"
                        style={{
                            borderRadius: `${topLeft ? `${topLeft}px` : '0'} ${topRight ? `${topRight}px` : '0'} ${bottomRight ? `${bottomRight}px` : '0'} ${bottomLeft ? `${bottomLeft}px` : '0'}`,
                        }}
                    />
                </div>
            </div>
            <div className="Shape__cssCode">
                <label>Code CSS:</label>
                <textarea id="cssCode" ref={textareaRef} value={cssCode} readOnly style={{ width: '100%', height: '100px' }} />
                <div className="Shape__cssCode__cssCopy">
                    <button className="copy-button" onClick={handleButtonClick}>
                        Copier le code CSS
                    </button>
                    {isCopied && <span>Code copié dans votre presse-papiers !</span>}
                </div>
            </div>
        </div>
    )
}

export default Shape