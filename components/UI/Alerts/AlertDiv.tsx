import { cva, VariantProps } from 'class-variance-authority'
import React,{FC,useEffect} from 'react'

const alertVariants = cva(
    "w-full p-4 outline-none text-sm",
    {
        variants : {
            variant : {
                error : "text-white bg-red-600 transition-colors duration-500 hover:bg-red-700",
                warning : "text-white bg-yellow-600 transition-colors duration-500 hover:bg-yellow-700",
                success : "text-white bg-green-600 transition-colors duration-500 hover:bg-green-700",
            }
        }
    }
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    alertMessage? : string
}

const AlertDiv : FC<AlertProps> = ({alertMessage,variant,...props}) => {
    useEffect(()=>{
        if(props.id){
            const alertDiv = document.getElementById(props.id) as HTMLDivElement;
            if(alertDiv){
                alertDiv.focus();
            }
        } 
    })
    if(!alertMessage || !variant) return (<></>);
    return (
        <div {...props} tabIndex={-1} className={alertVariants({variant})}>{alertMessage}</div>
    )
}

export {AlertDiv,alertVariants}