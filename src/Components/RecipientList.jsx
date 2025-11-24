import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { useDedicatedVirtualContext } from '../Contexts/DedicatedVirtualAccountContextProvider';
import Colors from '../Utils/Colors';





const RecipientList = ({item, onClickOpenTransferModal}) => {

    const [copied, setCopied] = useState(false)
    const {firstname,lastname,} = useDedicatedVirtualContext()

    return (
        <>
        <div className="col-sm-4 mb-3 mb-sm-0 mb-5 mt-5">
          <div className="card" style={{backgroundColor: Colors.LIGHT_GRAY}}>
            <div className="card-body">
                <h6 className="card-title">{item?.name}</h6>
                <div className="d-flex flex-row justify-content-between">
                    <p className="card-title text-primary">Account Number</p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="text-primary">{item?.account_number}</p>
                        <CopyToClipboard 
                            text={item?.account_number}
                            onCopy={() => { 
                                setCopied(true)
                                if(copied){
                                    toast.success('Account copied')
                                }
                            }
                        }>                   
                            <i type='button' className="fa fa-clipboard ml-2 " aria-hidden="true"></i>
                        
                        </CopyToClipboard>
                        
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <p className="card-text">Bank</p>
                    {/* <p className="card-text">{item?.recipient_code}</p> */}
                    <p className="card-text">{item?.bank_name}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button 
                        type="button" 
                        onClick={() => onClickOpenTransferModal()}
                        data-bs-toggle="modal" 
                        data-bs-target="#staticBackdropOpenTranferModal"
                        data-backdrop="false"

                    >
                        <i type='button' className="fa fa-telegram" style={{color: Colors.RED, fontSize: 45 + 'px'}} aria-hidden="true"></i>
                     </button>
                </div>
                 

                

            </div>
          </div>
        </div>
        </>
    )
}

export default RecipientList