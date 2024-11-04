import Script from "next/script";
import React from "react";

export default function Analytics({siteId}:{siteId: string}) {
    return (
        <>
            <Script async src={"https://www.googletagmanager.com/gtag/js?id="+siteId}/>
            <Script
            id="analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteId}');`,
            }}
            />
        </>
    );
};