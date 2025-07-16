import React, {useRef} from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import convert from "number-to-nepali-words";
import {convertToNepaliNumber} from "@/utils/commonFunctions";
import NepaliDate from 'nepali-date-converter';

function Membership({name = '', amount= 0, date = new Date()}) {
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
            paddingLeft: `103.8mm`,
            paddingRight: `31.6mm`,
            paddingTop: `85.2mm`,
            boxSizing: 'border-box',
            background: 'url("/assets/membership-certificate.png")' ,
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
            color: `#213e7c`
        },
        paragraph: {
            margin: '0',
            fontSize: '16pt',
            lineHeight: 1,
            position: 'relative',
            fontFamily: 'ARAP',
            zIndex: '2',
            letterSpacing: 0,
            color: "#213e7c",
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

        const mmToPt = mm => mm * 2.8346456693;
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

        pdf.save('membership_certificate.pdf');
        content.classList.remove('pdf-content');
    };

    return (
        <div>
            <button onClick={downloadPDF} style={styles.downloadButton}>
                Download PDF
            </button>
            <div style={{height: '297mm', overflowY: 'scroll', display: 'flex', justifyContent: 'center'}}>
                <div ref={contentRef} style={styles.container}>
                    <div className="page" style={styles.page}>

                        <div style={{position: 'relative', margin: 0, lineHeight: 1}}>
                            <p style={{...styles?.heading, margin: 0}}>
                                {
                                    ">L ========================================================================="
                                }</p>
                            <p style={{
                                ...styles.heading,
                                fontFamily: 'Noto Serif Devanagari',
                                position: 'absolute',
                                left: '20mm',
                                top: '-2mm',
                                margin: 0,
                                fontSize: '19pt'
                            }}>{name}</p>
                        </div>


                        <div style={{marginTop: '4mm', textAlign: 'center', marginBottom:0,}}>
                            <p style={{...styles?.paragraph,
                                letterSpacing: '-0.32pt'
                            }}>{"hLjg lj1fg k|lti7fgåf/f wflbª lhNnfsf] yfqm]–& df lgdf{0ffwLg hLjg lj1fg wfd -cGt/f{li6«o Wofg "}</p>
                            <div style={{position: 'relative'}}>
                                <p style={{
                                    ...styles?.paragraph,
                                }}>{" tyf cf/f]Uo s]Gb|_sf] lgdf{0ffy{ oxfFn] ug'{ePsf] ?==================== -cIf/]lk===================================\n" +
                                    "==============================================?lkofF_ cfly{s of]ubfg lbg'ePsf]df oxfFk|lt s[t1tf k|s6 ub{5f}F ."}</p>
                                <p style={{
                                    ...styles?.paragraph,
                                    fontFamily: 'Noto Serif Devanagari',
                                    position: 'absolute',
                                    left: '84mm',
                                    top: '1mm',
                                    fontSize: '11pt',
                                    fontWeight: 700
                                }}>{convertToNepaliNumber(amount ?? 0)}</p>
                                <p style={{
                                    ...styles?.paragraph,
                                    fontFamily: 'Noto Serif Devanagari',
                                    position: 'absolute',
                                    top: '0mm',
                                    textIndent: '125mm',
                                    fontSize: '11pt',
                                    lineHeight: '1.4',
                                    width: '100%',
                                    textAlign: 'left',
                                    fontWeight: 700,
                                }}>{convert(amount ?? 0, 'toNpWord')}</p>
                            </div>
                        </div>

                        <div style={{marginTop: '5mm', textAlign: 'center', marginBottom:0,}}>
                            {/*                           <div style={{position: 'relative'}}>
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
*/}
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '0.08pt'
                            }}>{"tkfO{+sf] of]ubfgn] Pp6f zfGt, lbJo, / r]tgfo'Qm cfWoflTds s]Gb| agfpg] ;femf ;kgfn] d\"t{?k"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '0.16pt'
                            }}>{"lnb}5 . o; cj;/df oxfFnfO{ "} <span style={{color: "#b83039"}}>{"‘wfd lgdf{0f ;b:o’"}</span> {"sf ¿kdf ;Ddfg ub}{ wfd lgdf{0f ;ª\\sNk"} </p>
                            <p style={{
                                ...styles?.paragraph,
                                lineHeight: 1,
                                margin: 0
                            }}>{";b:otf–kq k|bfg ub{5f}F . "}</p>
                        </div>
                        <div style={{marginTop: '6mm', textAlign: 'center', marginBottom:0,}}>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '0.16pt'
                            }}>{"cfufdL lbgx¿df klg cWofTd / dfgj sNof0fsf nflu oxfFsf] ;dk{0f cem ulx/f] / cljl5Gg"}</p>
                            <p style={{
                                ...styles?.paragraph,
                                letterSpacing: '0.16pt'
                            }}>{"alg/xf];\\ eGg] z'e]R5f JoQm ub{5f}F ."}</p>
                        </div>
                        <div style={{marginTop: '10mm', marginBottom: 0, lineHeight: 1, textAlign: 'center',position: 'relative', }}>
                            <div style={{
                                position: 'absolute',
                                display: 'flex',
                                margin: 0,
                                justifyContent: 'center',
                                top: '-35pt',
                                width: '100%',
                                textAlign: 'center'
                            }}>
                                <img style={{width: '60pt', margin: 0}} alt='sign' src='/assets/signature.png'></img>

                            </div>
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
                            }}>{"ldltM"}<span style={{
                                fontFamily: "Noto Serif Devanagari",
                                fontSize: '13pt',
                                fontWeight: 700
                            }}>  {new NepaliDate(date)?.format('YYYY/MM/DD', 'np')}</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Membership;