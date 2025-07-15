import React, {useRef} from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import convert from "number-to-nepali-words";
import {convertToNepaliNumber} from "@/utils/commonFunctions";

function Contribution({name = '', amount= 0, }) {
    const contentRef = useRef(null);

    const styles = {
        container: {
            fontFamily: 'Tinos',
            fontSize: '12pt',
            lineHeight: '1.5',
            color: '#000',
        },

        page: {
            width: '303mm',
            height: '216mm',
            paddingLeft: `103mm`,
            paddingRight: `31.2mm`,
            paddingTop: `70mm`,
            boxSizing: 'border-box',
            background: 'url("/assets/golden-certificate.png")' ,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            marginBottom: '15px',
            position: "relative",

        },
        downloadButton: {
            display: 'block',
            margin: '20px auto',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            fontWeight: '600',
            backgroundColor: '#1C7DBB',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        heading: {
            fontSize: '24pt',
            lineHeight: `24pt`,
            marginBottom: '0mm',
            fontWeight: 'bold',
            fontFamily: 'Ganesh',
            color: `#63391e`
        },
        paragraph: {
            margin: '0',
            fontSize: '16pt',
            lineHeight: 1,
            position: 'relative',
            fontFamily: 'ARAP',
            zIndex: '2',
            letterSpacing: 0,
            color: "#63391e",
        },

        signatureImage: {
            opacity: 1, // Adjust opacity as needed
            height: '50pt',
            width: '100pt',
            marginLeft: '4pt'
        },
        signatureLine: {
            margin: '4pt 0 0pt',
            fontSize: '10pt'
        },
    };
    const downloadPDF = async () => {
        const content = contentRef.current;

        const mmToPt = mm => mm * 2.83465;
        const widthPt = mmToPt(303);
        const heightPt = mmToPt(216);

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [widthPt, heightPt],
        });

        // Optional bullet fix
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
        .pdf-content ul { list-style: none !important; }
        .pdf-content li:before {
            content: "•";
            position: absolute;
            left: -9pt;
            top: 1pt;
        }
    `;
        document.head.appendChild(styleSheet);
        content.classList.add('pdf-content');

        const pages = content.querySelectorAll('.page');
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const canvas = await html2canvas(page, {
                scale: 3,         // sharp rendering
                useCORS: true,
                backgroundColor: null, // preserve transparency if any
            });
            const imgData = canvas.toDataURL('image/png'); // use PNG for better quality

            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, widthPt, heightPt);
        }

        pdf.save('contribution_certificate.pdf');
        content.classList.remove('pdf-content');
    };

    return (
        <div>
            <button onClick={downloadPDF} style={styles.downloadButton}>
                Download PDF
            </button>
            <div style={{overflowY: 'scroll', display: 'flex', justifyContent: 'center'}}>
                <div ref={contentRef} style={styles.container}>
                    <div className="page" style={styles.page}>

                        <div style={{position: 'relative', margin: 0, lineHeight: 1}}>
                            <p style={{...styles?.heading, marginLeft: '0.8mm'}}>
                                {
                                    ">L ========================================================================="
                                }</p>
                            <p style={{
                                ...styles.heading,
                                fontFamily: 'Noto Serif Devanagari',
                                position: 'absolute',
                                left: '20mm',
                                top: '-2mm',
                            }}>{name}</p>
                        </div>


                        <div style={{marginTop: '3.4mm', textAlign: 'center'}}>
                            <p style={{...styles?.paragraph}}>{"cWofTdnfO{ hLjgz}nLsf] d\"n cfwf/ agfO{ /fi6« / ;du| ljZjsf] ;'v, zflGt Pj+ ;d[l4df of]ubfg "}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.16pt'
                            }}>{"k'¥ofpg] dxfg p2]Zosf ;fy hLjg lj1fg wfd -cGt/f{li6«o cfWoflTds tyf cf/f]Uo s]Gb|_ sf] :yfkgf "}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.32pt'
                            }}>{"ul/Psf] xf] . o; wfdsf] nIo g]kfnnfO{ cWofTdsf] s]Gb| / ljZjel/sf dflg;sf nflu cf/f]Uo ko{6gsf] "}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.4pt'
                            }}>{"k|d'v uGtJosf ¿kdf :yflkt ug{' xf] . o;sf nflu wflbª lhNnfsf] yfqm]–& df wfd lgdf{0ffwLg 5 .  "}</p>
                        </div>

                        <div style={{marginTop: '3.4mm', textAlign: 'center'}}>
                            <div style={{position: 'relative'}}>
                                <p style={{...styles?.paragraph}}>{"o; kljq cleofgdf tkfO{+n] pRr r]tgf;lxt ;]jfefjn] k|]l/t eO{ ?=========================================="}</p>
                                <p style={{
                                    ...styles?.paragraph,
                                    fontFamily: 'Noto Serif Devanagari',
                                    position: 'absolute',
                                    right: '20mm',
                                    top: '-1mm',
                                    fontSize: '14pt',
                                    fontWeight: 700
                                }}>{convertToNepaliNumber(amount ?? 0)}</p>

                            </div>
                            <div style={{position: 'relative'}}>
                                <p style={{...styles?.paragraph}}>{"-cIf/]lk ===============================================================?lkofF_ cfly{s of]ubfg ug{'ePsf]df oxfFk|lt"}</p>
                                <p style={{
                                    ...styles?.paragraph,
                                    fontFamily: 'Noto Serif Devanagari',
                                    position: 'absolute',
                                    left: '17mm',
                                    top: '1mm',
                                    fontSize: '10pt',
                                    fontWeight: 700
                                }}>{convert(amount ?? 0, 'toNpWord')}</p>
                            </div>

                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.24pt'
                            }}>{"ulx/f] s[t1tf / cGtMx[bob]lv ;Ddfg k|s6 ub{5f}F . hLjg lj1fg wfdnfO{ r]tgf, cf/f]Uo / cWofTddf"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.48pt'
                            }}>{";dlk{t s]Gb| agfpg] ofqfdf oxfFsf] of]ubfg k|z+;gLo 5 . oxfFsf] >4f, ;dk{0f / ;]jfefjn] o; cleofgnfO{"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.4pt',
                                lineHeight: 1,
                                margin: 0
                            }}>{"gofF pmhf{ k|bfg u/]sf] 5 / cfWoflTds r]tgfsf] pHofnf] km}nfpg] sfo{sf lglDt k|]/0ffsf] ;|f]t ag]sf] 5 ."}</p>
                        </div>
                        <div style={{marginTop: '3.4mm', textAlign: 'center'}}>
                            <p style={{...styles?.paragraph}}>{"tkfO{+k|lt pRr >4f, ;Ddfg / cfef/ JoQm ub{}, cfufdL lbgx¿df klg cfWoflTds ofqf / dfgj"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '-0.288pt'
                            }}>{"sNof0fsf] ;]jfdf oxfFsf] ;dk{0f cem ulx/f], cljl5Gg / kmnbfoL alg/xf];\\ eGg] z'e]R5f JoQm ub{5f}F ."}</p>
                        </div>
                        <div style={{marginTop: '12mm', marginBottom: 0, lineHeight: 1, textAlign: 'center'}}>
                            <p style={{
                                ...styles?.paragraph,
                                fontFamily: 'Ganesh'
                            }}>{"======================================="}</p>
                            <p style={{
                                ...styles?.paragraph,
                                fontFamily: 'Ganesh',
                                fontSize: '18pt',
                                lineHeight: '1.2'
                            }}>{"b]jL zdf{"}</p>
                            <p style={{...styles?.paragraph, fontSize: '15pt'}}>{"u'?s'n ;+/−s"}</p>
                            <p style={{...styles?.paragraph, fontSize: '15pt'}}>{"hLjg lj1fg"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                fontSize: '15pt',
                                whiteSpace: 'pre'
                            }}>{"ldltM     ÷   ÷ "}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contribution;