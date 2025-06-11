import React from "react";
import { Linkedin, Github, Mail, Phone, Info } from "lucide-react";
import Section from "./widgets/Section";

const socials = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/omoroje",
        icon: <Linkedin className="h-5 w-5 text-blue-400" />,
    },
    {
        name: "GitHub",
        href: "https://gihub.com/benj1e",
        icon: <Github className="h-5 w-5 text-white" />,
    },
    {
        name: "Email",
        href: "mailto:benjaminalimele.com",
        icon: <Mail className="h-5 w-5 text-red-500" />,
    },
    {
        name: "Phone",
        href: "tel:+19027910501",
        icon: <Phone className="h-5 w-5 text-green-500" />,
    },
];

const Connect = () => {
    return (
        <Section>
            <h2 className="text-2xl font-mono2 mb-4">connect</h2>

            <div className="flex flex-wrap gap-4 justify-center font-links-light">
                {socials.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="flex gap-2 items-center justify-center p-4 bg-white/10 border border-white/10 rounded-2xl transition"
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-white text-lg font-medium">
                                {item.name}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

        </Section>
    );
};

export default Connect;
