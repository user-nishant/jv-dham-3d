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
        type= 'MEMBERSHIP',
        date = new Date()

    } =  {};

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