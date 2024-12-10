import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "react-bootstrap";
import './Dropdown.css'

const Dropdown = ({ title, open, className, children }) => {
    const [isOpen, setIsOpen] = useState(open);
    return (
        <Accordion defaultActiveKey={open ? "0" : null} className={className}>
            <AccordionItem eventKey="0">
                <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
                    {title}
                </AccordionHeader>
                <AccordionBody>{children}</AccordionBody>
            </AccordionItem>
        </Accordion>

    )
}

export default Dropdown