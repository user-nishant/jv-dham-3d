'use client';
import React, { useState } from 'react';
import {
    Steps,
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Typography,
    Select,
    Checkbox,
} from 'antd';
import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import Image from "next/image";
import {IoMdCloseCircleOutline} from "react-icons/io";
import {MdArrowOutward, MdCheck} from "react-icons/md";
import {useIsDesktop} from "@/app/hooks/window";
import {convertToNepaliNumber, numberInputProps} from "@/utils/commonFunctions";

const { Step } = Steps;
const { TextArea } = Input;

const NepalInsuranceForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [selectedAmount, setSelectedAmount] = useState(60000);
    const [customAmount, setCustomAmount] = useState('');
    const [formData, setFormData] = useState({});
    const paymentInitiate = (method, values) => {
        console.log('values', values);
       /* dispatch(
            callRequestPrivatePaymentInitiate(
                {
                    paymentType: 'COURSE',
                    paymentMethod: amount === 0 ? "FREE" : method,
                    userScheduleIdList: userScheduleIdList.split(','),
                    ...(values ? {voucherImage: values?.image?.response?.data?.path} : {}),
                },
                {
                    onSuccess: (res) => {
                        const {
                            paymentMethod,
                            params,
                            paymentUrl,
                            pid,
                            amount,
                        } = res;

                        console.log('res',res);

                        switch (paymentMethod) {
                            case 'ESEWA': {
                                // case PAYMENT_METHOD.CONNECT_IPS:
                                let form;
                                form = document.createElement('form');
                                form.setAttribute('method', 'POST');
                                form.setAttribute('action', paymentUrl);

                                for (let key in params) {
                                    let hiddenField =
                                        document.createElement('input');
                                    hiddenField.setAttribute('type', 'hidden');
                                    hiddenField.setAttribute('name', key);
                                    hiddenField.setAttribute(
                                        'value',
                                        params[key]
                                    );
                                    form.appendChild(hiddenField);
                                }

                                document.body.appendChild(form);
                                form.submit();
                                break;
                            }
                            case 'FONE_PAY': {
                                const {params = {}} = res || {}
                                const { signature = '' } = params?.DV || {};

                                let newParams = {
                                    ...params,
                                    DV: signature
                                }

                                var form = document.createElement("form");
                                form.setAttribute("method", "GET");
                                form.setAttribute("action", paymentUrl);

                                for (var key in newParams) {
                                    var hiddenField = document.createElement("input");
                                    hiddenField.setAttribute("type", "hidden");
                                    hiddenField.setAttribute("name", key);
                                    hiddenField.setAttribute("value", newParams[key]);
                                    form.appendChild(hiddenField);
                                }
                                document.body.appendChild(form);
                                form.submit();
                                break;
                            }

                            case 'KHALTI':
                            case 'STRIPE': {
                                router.push(paymentUrl);
                                break;
                            }

                            case 'BANK_DEPOSIT':
                            case 'FREE': {
                                return router.push(
                                    `/verify-payment?method=${paymentMethod}&pid=${pid}&amount=${amount}`
                                );
                            }
                            /!*case 'FREE':
                                router.push(`/schedules/confirmation?id=${query?.id}`);*!/
                        }
                    },
                    onError: (err) =>
                        message.error(err?.response?.data?.message),
                }
            )
        );*/
    };

    const amountOptions = [
        { value: 10000, label: 'रु १०,०००' },
        { value: 20000, label: 'रु २०,०००' },
        { value: 30000, label: 'रु ३०,०००' },
        { value: 50000, label: 'रु ५०,०००' },
        { value: 100000, label: 'रु १,००,०००' },
        { value: 60000, label: 'रु ६०,०००' }
    ];

    const handleNext = async () => {
        try {
            const values = await form.validateFields();
            setFormData({ ...formData, ...values });
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
        form.setFieldsValue({ amount: amount });
    };

    const handleCustomAmountChange = (value) => {
        setCustomAmount(value);
        setSelectedAmount(null);
        form.setFieldsValue({ amount: value });
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const finalData = { ...formData, ...values };
            console.log('Final form data:', finalData);
            // Handle form submission here
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const amount = Form.useWatch("amount", form);
    const allValues = form.getFieldsValue(true);
    const inputAmount = Form.useWatch("inputAmount", form);

    console.log('allValues', allValues);

    const steps = [
        {
            title: 'योगदान विवरण',
            icon: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.5 18.8907L11.5173 18.0037C8.0315 14.8346 5.75 12.7747 5.75 10.208C5.75 8.11662 7.36663 6.5 9.458 6.5C10.6308 6.5 11.7716 7.07037 12.5 7.9265C13.229 7.07037 14.3698 6.5 15.542 6.5C17.6334 6.5 19.25 8.11662 19.25 10.208C19.25 12.7752 16.9685 14.8666 13.4827 18.0352L12.5 18.8907Z"
                    fill="#3A3C5C"/>
            </svg>

        },
        {
            title: 'व्यक्तिगत विवरण',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.0003 6C10.3436 6 9.00011 7.34285 9.00011 9.00021C9.00011 10.6576 10.3436 12.0004 12.0003 12.0004C13.657 12.0004 15.0005 10.6569 15.0005 9.00021C15.0005 7.34348 13.6577 6 12.0003 6ZM12.0003 13.4059C9.74747 13.4059 5.25 14.5368 5.25 16.7808V18.6558H18.75V16.7808C18.75 14.5368 14.2532 13.4059 11.9997 13.4059H12.0003Z"
                    fill="#3A3C5C"/>
            </svg>


        },
        {
            title: 'भुक्तानी विवरण',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.50042 6C5.83727 6 5.20127 6.26339 4.73236 6.73223C4.26344 7.20107 4 7.83696 4 8.5V9H20V8.5C20 7.83696 19.7366 7.20107 19.2676 6.73223C18.7987 6.26339 18.1627 6 17.4996 6H6.50042ZM4 15.5V10H20V15.5C20 16.163 19.7366 16.7989 19.2676 17.2678C18.7987 17.7366 18.1627 18 17.4996 18H6.50108C5.83793 18 5.20194 17.7366 4.73302 17.2678C4.2641 16.7989 4.00067 16.163 4.00067 15.5M14.8325 13.6667C14.6998 13.6667 14.5726 13.7193 14.4789 13.8131C14.3851 13.9069 14.3324 14.0341 14.3324 14.1667C14.3324 14.2993 14.3851 14.4265 14.4789 14.5202C14.5726 14.614 14.6998 14.6667 14.8325 14.6667H17.1662C17.2988 14.6667 17.426 14.614 17.5198 14.5202C17.6136 14.4265 17.6663 14.2993 17.6663 14.1667C17.6663 14.0341 17.6136 13.9069 17.5198 13.8131C17.426 13.7193 17.2988 13.6667 17.1662 13.6667H14.8325Z"
                    fill="#3A3C5C"/>
            </svg>

        }
    ];

    const [paymentMethod, setPaymentMethod] = useState('FONE_PAY');
    const [selectedImage, setSelectedImage] = useState(null);
    const paymentMethodList = [
        {
            value: 'FONE_PAY',
            imageLink:'/assets/paymentMethods/fonePay.png',
            className: 'bg-white h-[22px] min-w-[74px] w-[74px] sm:min-w-[74px] sm:w-[74px] sm:h-[22px] relative'
        },

        ...(amount === '0' ? [] : [
            {
                value: 'KHALTI',
                label: 'Pay via Khalti',
                color: '#5C2E91',
                imageLink: '/assets/paymentMethods/khalti-mobile.png',
                className: 'bg-white h-[27px] min-w-[74px] w-[74px] sm:min-w-[74px] sm:w-[74px] sm:h-[27px] relative'
            },
            {
                value: 'ESEWA',
                label: 'Pay via eSewa',
                color: '#60BB46',
                imageLink: '/assets/paymentMethods/esewa-mobile.png',
                className: 'bg-white h-[27px] min-w-[74px] w-[74px] sm:min-w-[74px] sm:w-[74px] sm:h-[27px] relative'
            },

        ]),
    ]

    const renderStep1 = () => (
        <div>
            <Form.Item
                label="तपाईं कहिले योगदान दिन चाहनुहुन्छ?"
                name="contributionType"
                initialValue="monthly"
                layout='horizontal'
                rules={[{required: false, message: 'कृपया योगदान प्रकार छान्नुहोस्'}]}
            >
                <Radio.Group>
                    <Radio value="monthly">अहिले योगदान दिन्छु </Radio>
                    <Radio value="yearly">पछि योगदान दिन्छु</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="विवरण :"
                name="description"
                rules={[{required: false, message: 'कृपया विवरण लेख्नुहोस्'}]}
            >
                <TextArea
                    rows={4}
                    placeholder="तपाईंको योगदान विवरण लेख्नुहोस्"
                    style={{ fontSize: '16px' }}
                />
            </Form.Item>

            <Form.Item
                label="मिति :"
                name="date"
                rules={[{ required: true, message: 'कृपया मिति छान्नुहोस्' }]}
            >
                <DatePicker
                    style={{ width: '100%', maxWidth: '300px' }}
                    placeholder="मिति चयन गर्नुहोस्"
                    suffixIcon={<CalendarOutlined />}
                />
            </Form.Item>

            <Form.Item
                label="योगदान रकम छान्नुहोस् :"
                name="amount"
                rules={[{ required: true, message: 'कृपया रकम छान्नुहोस्' }]}
            >
                <Radio.Group className="amount-section w-full" onChange={()=>{
                    form?.setFieldsValue({
                        inputAmount: null
                    })
                }}>
                    <div className='flex w-full gap-[10px] justify-center'
                         size="large">
                        {amountOptions.map(option => (
                            <Radio.Button
                                key={option.value}
                                value={option.value}
                                className="w-[112px] h-[60px] sm:w-full sm:h-[155px] !flex !justify-center !items-center p-[15px] sm:p-[15px] bg-[#fff] !border-[1px] !border-[#F4F4F4] !rounded-[10px] sm:!rounded-[10px]"
                            >
                                {
                                    option?.label
                                }
                            </Radio.Button>
                        ))}
                    </div>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="inputAmount"
            >
                <Input onChange={()=>{
                    form?.setFieldsValue({
                        amount: null
                    })
                }} type='number' {...numberInputProps} rootClassName='input-prefix-amount' prefix="रू" placeholder='आफ्नै रकम टाइप गर्नुहोस्' />

            </Form.Item>
        </div>
    );

    const renderStep2 = () => (
        <div>
            <div className='grid grid-cols-2 gap-x-[30px]'>
                <Form.Item
                    label="पूरा नाम थर :"
                    name="fullName"
                    rules={[{ required: true, message: 'कृपया पूरा नाम लेख्नुहोस्' }]}
                >
                    <Input placeholder="तपाईंको पूरा नाम लेख्नुहोस्‌" />
                </Form.Item>

                <Form.Item
                    label="ठेगाना :"
                    name="address"
                    rules={[{ required: true, message: 'कृपया ठेगाना लेख्नुहोस्' }]}
                >
                    <Input placeholder="तपाईंको फोन नम्बर" />
                </Form.Item>

                <Form.Item
                    label="फोन नम्बर"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'कृपया फोन नम्बर लेख्नुहोस्' }]}
                >
                    <Input placeholder="तपाईंको सम्पर्क नम्बर लेख्नुहोस्‌" />
                </Form.Item>
                <Form.Item
                    label="इमेल"
                    name="email"
                    rules={[
                        { required: true, message: 'कृपया इमेल लेख्नुहोस्' },
                        { type: 'email', message: 'वैध इमेल ठेगाना लेख्नुहोस्' }
                    ]}
                >
                    <Input placeholder="तपाईंको इमेल ठेगाना लेख्नुहोस्‌" />
                </Form.Item>

            </div>


            <Form.Item
                name="showName"
                valuePropName="checked"
                rules={[{ required: false, }]}
            >
                <Checkbox>
                    के तपाईं आफ्नो नाम खुलाउन चाहनुहुन्छ?
                </Checkbox>
            </Form.Item>
        </div>
    );
    const renderStep3 = () => (
        <div className='bg-white px-[47px] py-[25px] rounded-[5px]'>
            <div className={'col-start-1 col-end-5 sm:col-end-13'}>
                <div className={'flex flex-col gap-[20px] sm:gap-4'}>
                    <div className='radio-section'>
                        <Radio.Group value={paymentMethod}
                                     onChange={(e) => {
                                         setPaymentMethod(e?.target?.value)
                                     }}
                                     className={'payment-provider-select w-full'}>
                            <div className='grid grid-cols-3 gap-[10px]'
                                 style={{
                                     width: '100%',
                                 }}>
                                {paymentMethodList.map(option => (
                                    <Radio.Button
                                        key={option.value}
                                        value={option.value}
                                        className="col-span-1 !h-[75px] sm:h-[75px] !flex justify-center items-center p-[15px] bg-[#fff] !border-[1px] border-[#F4F4F4] !rounded-[10px] sm:p-[15px] sm:!border-[1px] sm:border-[#F4F4F4] sm:!rounded-[10px]"
                                    >
                                        <div className='flex flex-col justify-center items-center gap-[10px]'>
                                            <div
                                                className={option?.className}>
                                                <Image
                                                    src={option?.imageLink}
                                                    alt={'qr'}
                                                    layout={'fill'}/>
                                            </div>
                                        </div>
                                    </Radio.Button>
                                ))}
                            </div>
                        </Radio.Group>
                    </div>
                </div>
            </div>
            <div className={'col-start-5 col-end-13 sm:col-start-1'} id={'payment-method'}>
                <div className={'pt-[29px]'}>
                    {paymentMethod === 'FONE_PAY' ?
                            <PaymentByFonePay
                                              form={form}
                                              amount={allValues?.amount}
                                              selectedImage={selectedImage}
                                              paymentInitiate={paymentInitiate}/>
                            : <PaymentViaWallet method={paymentMethod}
                                                amount={allValues?.amount}
                                                onProceed={paymentInitiate}/>}
                </div>
            </div>
        </div>
    );

    const stepContent = [renderStep1, renderStep2, renderStep3];

    return (
        <div className='w-full flex flex-col relative bg-[#FAF7ED]'>
            <div
                className="relative before::content-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-[0.5] before:bg-[url('/assets/footer_bg.png')] before:bg-cover before:bg-center before:bg-no-repeat"
                id='contribution-form'>
                <div className="px-[150px] flex justify-between items-center mb-4">
                    <div className="flex justify-between w-full items-center gap-3 z-1">
                        <div className="w-[125px] h-[88px] relative">
                            <Image fill
                                   alt="logo"
                                   src={'/assets/jv_logo.png'}/>
                        </div>
                        <h4 className='text-jv-red font-semibold text-[24px] leading-[44px]'>
                            जीवन विज्ञान धाम सहभागिता / संकल्प पत्र
                        </h4>
                        <Button
                            type="link"
                            icon={<IoMdCloseCircleOutline className='text-[32px]  !text-jv-red'/>}
                            className="!p-0 !w-max !min-w-0 !bg-transparent !shadow-none hover:text-opacity-[0.8]"
                        />
                    </div>

                </div>
                {/* Main Form */}
                <div className='px-[345px] mb-[37px]'>
                    <Steps
                        labelPlacement="vertical"
                        current={currentStep} className="mb-8">
                        {steps.map((step, index) => {
                            const isFinished = index < currentStep;
                            return (
                                <Step
                                    key={index}
                                    title={step.title}
                                    status={isFinished ? 'finish' : index === currentStep ? 'process' : 'wait'}
                                    icon={isFinished ? <MdCheck className='text-white'/> : step.icon}

                                    className={index === currentStep ? 'ant-steps-item-active' : ''}
                                />
                            )
                        })}
                    </Steps>

                </div>


                <Form layout='vertical' requiredMark={false} form={form}>
                    <div className="px-[345px]">
                        {stepContent[currentStep]()}
                        <div className="flex justify-between mt-[20px]  ">
                            {
                                currentStep === 0 ?<>
                                        {
                                            (amount || inputAmount) ?
                                                <div className='flex items-center gap-[5px] z-1 text-jv-red text-[18px] font-semibold'>
                                                    <img src='/assets/gifs/pray.gif' alt='jv logo' className='w-[32px] h-[32px]'/>
                                                    रू. {
                                                    convertToNepaliNumber((amount || inputAmount) ?? 0)
                                                } को योगदानका लागि धन्यवाद।
                                                </div>:
                                                <div></div>
                                        }
                                    </>
                                    :
                                    <Button
                                        type="text"
                                        className='!p-0 !shadow-none !text-[#808080]'
                                        onClick={handlePrevious}
                                        disabled={currentStep === 0}
                                        iconPosition='start'
                                        icon={<ArrowLeftOutlined/>}
                                        size="large"
                                    >
                                        Back
                                    </Button>

                            }

                            {currentStep < steps.length - 1 ? (
                                <Button
                                    type="primary"
                                    onClick={handleNext}
                                    icon={<MdArrowOutward/>}
                                    size="large"
                                    iconPosition='end'

                                    className="bg-red-600 hover:bg-red-700 border-red-600 active:!bg-red-800 disabled:bg-red-600 disabled:cursor-not-allowed"
                                >
                                    Next step
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={paymentInitiate}
                                    size="large"
                                    iconPosition='end'
                                    icon={<MdArrowOutward/>}
                                    className="bg-green-600 hover:bg-green-700 border-green-600 active:!bg-red-800 disabled:bg-red-600 disabled:cursor-not-allowed"
                                >
                                    पेश गर्नुहोस्
                                </Button>
                            )}
                        </div>
                    </div>

                </Form>

            </div>
        </div>
    );
};

export default NepalInsuranceForm;


const PaymentByFonePay = ({paymentInitiate, amount}) => {
    return (
        <div className={'flex flex-col gap-[39px] sm:flex-col items-center'}>
            <div
                className={'bg-white h-[50px] min-w-[180px] w-[180px] sm:min-w-[180px] sm:w-[180px] sm:h-[50px] relative'}>
                <Image
                    src={'/assets/paymentMethods/fonePay.png'}
                    alt={'qr'}
                    layout={'fill'}/>
            </div>
            <span className={'text-[14px] leading-[20px] font-normal text-center text-[#505050] sm:text-xs'}>
                <>Fonepay is licensed by Nepal Rastra Bank as a payment service provider, and making a payment through Fonepay will generate dynamic QR code to complete the transaction and verify your booking process.</>
            </span>
            <div className='bg-[#EFF2F7] px-[20px] py-[23px] sm:px-[20px] sm:py-[23px]'>
                <p className='text-[14px] sm:text-[14px] leading-[1.4] font-normal text-[#3A3C5C]'>
                    Amount To be Paid:
                    <span className='ml-[66px] sm:ml-[50px] text-[18px] sm:text-[18px] font-bold'>
                                Rs. {convertToNepaliNumber(parseFloat(amount))}

                        </span>
                </p>

            </div>
        </div>
    )
}

const PaymentViaWallet = ({
                              method, onProceed, amount
                          }) => {
    const wallet = method === "KHALTI" ? 'Khalti' : 'eSewa';
    return (
        <div className='flex justify-center'>
        <div className={'flex flex-col gap-[39px] w-[455px] sm:w-[455px] items-center sm:gap-[39px]'}>
                <div
                    className={'bg-white h-[106px] min-w-[200px] w-[200px] sm:min-w-[140px] sm:w-[140px] sm:h-[74px] relative'}>
                    <Image
                        src={method === "KHALTI" ? '/assets/paymentMethods/khalti-pay.png' : '/assets/paymentMethods/esewa-pay.png'}
                        alt={'qr'}
                        layout={'fill'}/>
                </div>
                <span className={'text-[14px] leading-[20px] font-normal text-center text-[#505050] sm:text-xs'}>
                {method === "KHALTI" ? <>Khalti is licensed by Nepal Rastra Bank as a payment service provider, and
                        making a payment through Khalti will redirect you to their website to complete the transaction.</> :
                    <>e-Sewa is licensed by Nepal Rastra Bank as a payment service provider, and making a payment
                        through esewa will redirect you to their website to complete the transaction.</>}
            </span>
                <div className='bg-[#EFF2F7] px-[20px] py-[23px] sm:px-[20px] sm:py-[23px]'>
                    <p className='text-[14px] sm:text-[14px] leading-[1.4] font-normal text-[#3A3C5C]'>
                        Amount To be Paid:
                        <span className='ml-[66px] sm:ml-[50px] text-[18px] sm:text-[18px] font-bold'>
                                Rs. {convertToNepaliNumber(parseFloat(amount))}

                        </span>
                    </p>

                </div>
            </div>

        </div>
    )
}
