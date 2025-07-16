'use client';
import React, {useRef} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import convert from 'number-to-nepali-words';
import Contribution from "@/app/components/certificates/contribution";
import Membership from "@/app/components/certificates/membership";

function Page(props) {
    const {
        name= "बिष्णु कुमार लामा",
        amount = 1105020125,
        type= 'CONTRIBUTION',
        date = new Date()

    } =  {};
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



    return (
        <div>
            {(()=>{
                switch (type){
                    case 'CONTRIBUTION':
                        return <Contribution name={name} date={date} amount={amount}></Contribution>
                    case 'MEMBERSHIP':
                        return <Membership name={name} date={date} amount={amount}></Membership>
                }
            })()}
        </div>
    );
}

export default Page;