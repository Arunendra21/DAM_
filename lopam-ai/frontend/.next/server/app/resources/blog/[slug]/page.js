"use strict";(()=>{var e={};e.id=9573,e.ids=[9573],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{e.exports=require("path")},17360:e=>{e.exports=require("url")},71814:(e,t,a)=>{a.r(t),a.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c}),a(16348),a(80544),a(35866);var r=a(23191),s=a(88716),i=a(37922),o=a.n(i),n=a(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);a.d(t,l);let c=["",{children:["resources",{children:["blog",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,16348)),"/home/lenovo/Me/Dciphers/lopam-ai/frontend/src/app/resources/blog/[slug]/page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,80544)),"/home/lenovo/Me/Dciphers/lopam-ai/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/lenovo/Me/Dciphers/lopam-ai/frontend/src/app/resources/blog/[slug]/page.tsx"],p="/resources/blog/[slug]/page",m={require:a,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/resources/blog/[slug]/page",pathname:"/resources/blog/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},16348:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p,generateMetadata:()=>d,generateStaticParams:()=>c});var r=a(19510),s=a(58585),i=a(76257),o=a(48161),n=a(2487),l=a(57371);async function c(){return n.nd.map(e=>({slug:e.slug}))}async function d({params:e}){let t=n.O[e.slug];return t?{title:`${t.title} - Lopam AI Blog`,description:t.excerpt,keywords:t.tags,openGraph:{title:t.title,description:t.excerpt,url:`https://lopam-ai.com/resources/blog/${e.slug}`,type:"article",publishedTime:t.publishedAt.toISOString(),authors:["Lopam AI"]}}:{title:"Article Not Found"}}function p({params:e}){let t=n.O[e.slug];t||(0,s.notFound)();let a=n.nd.filter(e=>e.id!==t.id&&e.category===t.category).slice(0,3);return(0,r.jsxs)(r.Fragment,{children:[r.jsx(i.w,{}),(0,r.jsxs)("main",{className:"pt-16 bg-white dark:bg-slate-950",children:[r.jsx("section",{className:"section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10",children:(0,r.jsxs)("div",{className:"max-w-3xl mx-auto",children:[r.jsx(l.default,{href:"/resources/blog",children:r.jsx("p",{className:"text-primary font-semibold hover:underline mb-6",children:"← Back to Blog"})}),r.jsx("span",{className:"inline-block px-4 py-2 mb-6 bg-primary text-white rounded-full text-sm font-bold",children:t.category}),r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6",children:t.title}),(0,r.jsxs)("div",{className:"flex items-center gap-6 flex-wrap text-slate-700 dark:text-gray-200 font-semibold",children:[r.jsx("span",{children:t.publishedAt.toLocaleDateString()}),(0,r.jsxs)("span",{children:[t.viewCount.toLocaleString()," views"]}),(0,r.jsxs)("span",{children:[Math.ceil(t.content.split(" ").length/200)," min read"]})]}),r.jsx("div",{className:"flex gap-2 mt-6 flex-wrap",children:t.tags.map(e=>(0,r.jsxs)("span",{className:"px-3 py-1 text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full",children:["#",e]},e))})]})}),r.jsx("section",{className:"section-container",children:r.jsx("div",{className:"max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-gray-300 prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary prose-a:font-semibold prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800",children:r.jsx("div",{className:"text-slate-700 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap",children:t.content})})}),r.jsx("section",{className:"section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10",children:r.jsx("div",{className:"max-w-3xl mx-auto",children:(0,r.jsxs)("div",{className:"p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700",children:[r.jsx("h3",{className:"text-xl font-bold text-slate-900 dark:text-white mb-2",children:"About Lopam AI"}),r.jsx("p",{className:"text-slate-700 dark:text-gray-200 font-medium leading-relaxed",children:"Lopam AI is the leading enterprise database security platform, protecting databases with real-time monitoring, threat detection, and compliance automation."})]})})}),a.length>0&&r.jsx("section",{className:"section-container",children:(0,r.jsxs)("div",{className:"max-w-6xl mx-auto",children:[r.jsx("h2",{className:"text-3xl font-bold text-slate-900 dark:text-white mb-8",children:"Related Articles"}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:a.map(e=>r.jsx(l.default,{href:`/resources/blog/${e.slug}`,children:(0,r.jsxs)("div",{className:"group h-full rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col",children:[r.jsx("span",{className:"text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 w-fit mb-4",children:e.category}),r.jsx("h3",{className:"text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 flex-1",children:e.title}),(0,r.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700",children:[r.jsx("span",{className:"text-xs text-slate-600 dark:text-gray-400 font-semibold",children:e.publishedAt.toLocaleDateString()}),r.jsx("span",{className:"text-primary font-bold text-sm",children:"Read →"})]})]})},e.id))})]})}),r.jsx("section",{className:"section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10",children:(0,r.jsxs)("div",{className:"max-w-4xl mx-auto text-center",children:[r.jsx("h2",{className:"text-3xl font-bold text-slate-900 dark:text-white mb-6",children:"Subscribe to Our Blog"}),r.jsx("p",{className:"text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg",children:"Get the latest database security insights delivered to your inbox."}),(0,r.jsxs)("div",{className:"flex gap-3 flex-col sm:flex-row max-w-md mx-auto",children:[r.jsx("input",{type:"email",placeholder:"Enter your email",className:"flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400"}),r.jsx("button",{className:"px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap",children:"Subscribe"})]})]})})]}),r.jsx(o.$,{})]})}},2487:(e,t,a)=>{a.d(t,{O:()=>i,nd:()=>r,o3:()=>s});let r=[{id:"post-1",title:"PCI-DSS 4.0: Database Monitoring Requirements Explained",slug:"pci-dss-4-database-monitoring",excerpt:"Complete guide to PCI-DSS 4.0 database monitoring requirements for payment card industry compliance.",category:"Compliance",tags:["PCI-DSS","compliance","payments"],content:`# PCI-DSS 4.0: Database Monitoring Requirements

PCI-DSS 4.0 introduces stricter requirements for database monitoring and activity logging. Organizations must:

## Key Requirements

1. **Real-time Monitoring**: Monitor all database access and activities in real-time
2. **Audit Logging**: Maintain complete audit logs of all database activities
3. **Access Control**: Implement role-based access control for database users
4. **Query Logging**: Log all database queries and modifications
5. **Alert System**: Implement automated alerting for suspicious activities

## Implementation with Lopam AI

Lopam AI helps meet these requirements by:
- Providing real-time database activity monitoring
- Maintaining comprehensive audit logs
- Automating compliance reporting
- Detecting suspicious activities automatically

Learn how to achieve PCI-DSS 4.0 compliance today.`,publishedAt:new Date("2024-01-20"),createdAt:new Date("2024-01-20"),viewCount:1240,authorId:"author-1"},{id:"post-2",title:"SQL Injection Attacks: Detection and Prevention",slug:"sql-injection-detection",excerpt:"Learn how to detect and prevent SQL injection attacks targeting your databases.",category:"Security",tags:["security","SQL injection","threats"],content:`# SQL Injection Attacks: Detection and Prevention

SQL injection remains one of the most common database attacks. Here's how to protect your databases.

## What is SQL Injection?

SQL injection attacks occur when malicious SQL code is injected into input fields...

## Detection Methods

1. **Pattern Analysis**: Detect suspicious SQL patterns
2. **Behavioral Analysis**: Identify unusual query patterns
3. **Query Parsing**: Analyze query structure for injection indicators

## Prevention Strategies

- Use parameterized queries
- Implement input validation
- Deploy Web Application Firewalls
- Monitor database activities
- Regular security testing

Lopam AI detects SQL injection attempts automatically and alerts your security team.`,publishedAt:new Date("2024-02-10"),createdAt:new Date("2024-02-10"),viewCount:2150,authorId:"author-2"},{id:"post-3",title:"Zero Trust Database Access: A Complete Guide",slug:"zero-trust-database-access",excerpt:"Implement zero trust principles for secure database access management.",category:"Best Practices",tags:["security","access control","zero-trust"],content:`# Zero Trust Database Access: A Complete Guide

Zero trust security principles applied to database access provide maximum protection against insider threats and compromised credentials.

## Zero Trust Principles

1. Never trust, always verify
2. Assume breach mentality
3. Principle of least privilege
4. Continuous monitoring
5. Explicit access approval

## Implementation Steps

1. Identify all database users
2. Implement multi-factor authentication
3. Deploy just-in-time access
4. Monitor all activities
5. Regular access reviews

Lopam AI enables zero trust database access with privileged access management and behavioral analytics.`,publishedAt:new Date("2024-02-25"),createdAt:new Date("2024-02-25"),viewCount:1890,authorId:"author-1"},{id:"post-4",title:"HIPAA Compliance for Healthcare Databases",slug:"hipaa-compliance-healthcare",excerpt:"Ensure HIPAA compliance for healthcare databases with proper monitoring and access controls.",category:"Compliance",tags:["HIPAA","healthcare","compliance"],content:`# HIPAA Compliance for Healthcare Databases

Healthcare organizations must implement strict controls to protect patient health information (PHI).

## HIPAA Requirements for Databases

- Audit controls and activity logging
- Access controls and authentication
- Encryption and decryption
- Emergency access procedures
- Risk assessment and management

## Lopam AI for HIPAA Compliance

Our platform provides:
- PHI access monitoring
- Emergency access logging
- Automated compliance reports
- Audit trail maintenance
- Breach detection

Deploy with confidence knowing your patient data is protected.`,publishedAt:new Date("2024-03-05"),createdAt:new Date("2024-03-05"),viewCount:1650,authorId:"author-3"},{id:"post-5",title:"Detecting Insider Threats with User Behavior Analytics",slug:"insider-threat-detection",excerpt:"Use behavioral analytics to detect insider threats before they cause damage.",category:"Security",tags:["insider threats","analytics","detection"],content:`# Detecting Insider Threats with User Behavior Analytics

Insider threats are a growing concern. User behavior analytics can detect anomalous activities.

## Behavioral Analytics Features

- Establish user baselines
- Detect deviations from normal behavior
- Identify suspicious patterns
- Correlate events across systems
- Generate risk scores

## Detection Examples

- Unusual access times
- Accessing unusual data
- Large data downloads
- Failed access attempts
- Privilege escalations

Lopam AI's behavioral analytics detect insider threats in real-time.`,publishedAt:new Date("2024-03-15"),createdAt:new Date("2024-03-15"),viewCount:2340,authorId:"author-2"}],s=r.reduce((e,t)=>(e[t.category]||(e[t.category]=[]),e[t.category].push(t),e),{}),i=r.reduce((e,t)=>(e[t.slug]=t,e),{})}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[8948,724,6621,434,5062,2977,4370],()=>a(71814));module.exports=r})();