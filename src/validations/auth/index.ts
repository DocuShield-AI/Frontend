/**
 * Form validations — har DocuShield form schema ka ek barrel.
 *
 * Pages `@/validations` (ya `@/validations/*`) se import karte hain, individual
 * files me nahi ghuste — taaki consumer imports kabhi churn na hon jab koi file
 * split ho ya schema move kare. Har schema ke saath inferred `*Values` type
 * react-hook-form ke `useForm<XxxValues>()` ke liye.
 *
 * Wiring note: zod schemas `@hookform/resolvers` + react-hook-form ke through
 * auth (#9), upload (#6) aur Members (#8) pages me consume hote hain. Yeh
 * package jaan boojh kar bare schemas bhejta hai — resolver wiring form
 * consumer ke paas rehti hai taaki runtime-form aur shape alag evolve hon.
 */

export * from "./common";
export * from "./login";
export * from "./register";
export * from "./upload";
export * from "./invite";
