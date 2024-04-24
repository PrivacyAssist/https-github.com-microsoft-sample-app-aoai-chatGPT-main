import React, { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import styles from "./QuestionInput.module.css";


interface Props {
    onSend: (question: string, id?: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    conversationId?: string;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, conversationId }: Props) => {
    const [question, setQuestion] = useState<string>("");

  const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        if(conversationId){
            onSend(question, conversationId);
        }else{
            onSend(question);
        }

        if (clearOnSend) {
            setQuestion("");
        }
    };

    
    const [isVisible, setIsVisible] = useState(true);

    const handleButtonClick = () => {
      setIsVisible(false);
    }
      
    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey && !(ev.nativeEvent?.isComposing === true)) {
            ev.preventDefault();
            sendQuestion();
            handleButtonClick();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setQuestion(newValue || "");
    };

    const sendQuestionDisabled = disabled || !question.trim();

   

    return (
        <Stack>
             <div>
      {isVisible && (
         <Stack  className={styles.buttonstack}>

              <div className={styles.buttoncontainer}>
 

             <button className={styles.custombutton}  onClick={()=>{onSend('How do I intiate a finance privacy review','');handleButtonClick();}}>
                  <span className={styles.line}><strong>How do I intiate </strong> </span>
                  <span className={styles.Subline}>a finance privacy review </span>
                  
             </button>

             <button  className={styles.custombutton}  onClick={()=>{onSend('Who are key contacts on the privacy team','');handleButtonClick()}}>
                 <span className={styles.line}><strong>Who are key contacts </strong></span>                    
                 <span className={styles.Subline}>on the privacy team</span>
             </button>

             </div>

             <div className={styles.buttoncontainer}>
 
             <button className={styles.custombutton}  onClick={()=>{ onSend('Show me where the finance privacy site is','');handleButtonClick()}}>
                  <span className={styles.line}><strong>Show me where  </strong>  <br/> </span>
                  <span className={styles.Subline}>the finance privacy site is</span>
             </button>

             <button className={styles.custombutton} onClick={()=>{onSend('How do I know when to start a privacy review ','');handleButtonClick()}}>
                 <span className={styles.line}><strong>How do I know when to start</strong></span>
                 <span className={styles.Subline}>a privacy review</span>
            </button>
              </div>

         </Stack>
          )}
          
          </div>
       
           <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className={styles.questionInputSendButtonContainer} 
                role="button" 
                tabIndex={0}
                aria-label="Ask question button"
                onClick={()=>{sendQuestion();handleButtonClick()}}
                onKeyDown={e => e.key === "Enter" || e.key === " " ? sendQuestion() : null}
            >
                { sendQuestionDisabled ? 
                    <SendRegular className={styles.questionInputSendButtonDisabled}/>
                    :
                    <img src={Send} className={styles.questionInputSendButton}/>
                }
            </div>
            <div className={styles.questionInputBottomBorder} />
         </Stack>
     </Stack>
    );
};


