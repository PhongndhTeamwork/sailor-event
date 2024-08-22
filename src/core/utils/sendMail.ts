'use strict';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});
// async..await is not allowed in global scope, must use a wrapper
export async function send(otp: string, email: string): Promise<any> {
  await transporter.sendMail({
    from: `Rave <${process.env.EMAIL_NODEMAILER}>`, // sender address
    to: email, // list of receivers
    subject: `Welcome to Rave's Alpha Test!`, // Subject line
    //     text: `Hello Alpha Tester,

    // Thank you for registering with Rave!
    // Your OTP is: ${otp}

    // Best Regards,
    // The Rave Team`, // plain text body
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2//EN">
    <html lang="">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentsettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentsettings>
      </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="address=no">
      <meta name="format-detection" content="telephone=no">
      <meta name="format-detection" content="email=no">
      <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
      <style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1702457");</style>
      <!--<![endif]-->
    
      <!--[if mso]>
      <style type="text/css">
        .content-MS .content img { width: 560px; }
      </style>
      <![endif]-->
    
      <!--[if (mso)|(mso 16)]>
      <style type="text/css">
        .mlContentButton a { text-decoration: none; }
      </style>
      <![endif]-->
    
      <!--[if !mso]><!-- -->
      
      <!--<![endif]-->
    
      <!--[if (lt mso 16)]>
      <style type="text/css" if="variable.bodyBackgroundImage.value">
        .mlBodyBackgroundImage { background-image: none; }
      </style>
      <![endif]-->
    
      <style type="text/css">
        .ReadMsgBody { width: 100%; }
        .ExternalClass{ width: 100%; }
        .ExternalClass * { line-height: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
        body { margin: 0; padding: 0; }
        body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table td { border-collapse: collapse; }
        table { border-spacing: 0; border-collapse: collapse; }
        p, a, li, td, blockquote { mso-line-height-rule: exactly; }
        p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        img, a img { border: 0; outline: none; text-decoration: none; }
        img { -ms-interpolation-mode: bicubic; }
        * img[tabindex="0"] + div { display: none !important; }
        a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
        a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
        #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
        #MessageViewBody { width: 100% !important; }
        #MessageWebViewDiv { width: 100% !important; }
    
        @-moz-document url-prefix() {
          .bodyText p a, .bodyTitle p a {
            word-break: break-word;
          }
        }
    
        @media screen {
          body {
          font-family: 'Poppins', sans-serif;
        }
        * {
        direction: ltr;
        }
        }
    
        @media only screen and (min-width:768px){
          .mlEmailContainer{
            width: 640px!important;
          }
        }
    
        @media only screen and (max-width: 640px) {
          .mlTemplateContainer {
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlTemplateContainer{
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentCenter{
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentTable{
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentBlock{
            display: block !important;
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuter{
            padding-bottom: 0px!important;
            padding-left: 15px!important;
            padding-right: 15px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterSmall{
            padding-bottom: 0px!important;
            padding-left: 10px!important;
            padding-right: 10px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlMenuOuter{
            padding-bottom: 0px!important;
            padding-left: 5px!important;
            padding-right: 5px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterFullBig{
            padding: 30px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage img {
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage160 img {
            height: auto!important;
            max-width: 160px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage260 img {
            height: auto!important;
            max-width: 260px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage{
            height: 100%!important;
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlProductImage{
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentButton a{
            display: block!important;
            width: auto!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mobileHide{
            display: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mobileShow{
            display: block!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter{
            height: auto!important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter img{
            display: inline !important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginBottom{
            margin-bottom: 15px!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginTop {
            margin-top: 10px !important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentHeight{
            height: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlDisplayInline {
            display: inline-block!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlNoFloat{
            float: none!important;
            margin-left: auto!important;
            margin-right: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey{
            float: none!important;
            margin-bottom: 10px!important;
            width:100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey td a{
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .multiple-choice-item-table{
            width: 100% !important;
            margin-bottom: 20px !important;
            min-width: 10% !important;
            float: none !important;
          }
        } @media only screen and (max-width: 640px) {
          body{
            margin: 0px!important;
            padding: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          body, table, td, p, a, li, blockquote{
            -webkit-text-size-adjust: none!important;
          }
        }
        @media only screen and (max-width: 480px){
          .social-LinksTable{
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:first-child{
            padding-left: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:last-child{
            padding-right: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td{
            padding: 0 10px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td img{
            height: auto!important;
            max-width: 48px;
            width: 100%!important;
          }
        }
    
        /* Carousel style */
    
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .webkit {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .non-webkit {
            display: none !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          /* TARGET OUTLOOK.COM */
          [class="x_non-webkit"] {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          [class="x_webkit"] {
            display: none !important;
          }
        }
    
      </style>
    
      <!--[if mso]>
      <style type="text/css">
        .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
        .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
      </style>
      <![endif]-->
      
    <style type="text/css">
            @media only screen and (max-width: 640px){
              #logoBlock-4 {
                max-width: 208px!important;
                width: 100%!important;
              }
            }
          </style><style type="text/css">
      @media only screen and (max-width: 640px){
        #imageBlock-12 img {
          max-width: 1938px!important;
          width: 100%!important;
        }
      }
    </style><meta name="robots" content="noindex, nofollow">
    <title>⏳ Final Day to Enter Organya's Christmas Tournament – Earn $8!</title>
    </head>
    
    <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;"><span style="display:none"><img src="https://i.ibb.co/gtqhT8s/Icon-Racing-final-2.png" width="1" height="1" alt="" style="display:block;height:0px;width:0px;max-width:0px;max-height:0px;overflow:hidden;" border="0"></span>
    
    <!-- Make your email an accessible article. -->
    <div role="article" aria-roledescription="email" aria-label="">
    
    <!--[if !mso]><!-- -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f6f8f9" class="mainTable mlBodyBackground" dir="ltr" background="">
      <tr>
        <td class="mlTemplateContainer" align="center">
          <!--<![endif]-->
    
          <!--[if mso 16]>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td bgcolor="#f6f8f9" align="center">
                <!--<![endif]-->
    
          <!-- Content starts here -->
    
          
    
          
    
            <!-- BORDER RADIUS FOR CARDS LAYOUT -->
            
    
    
            <!-- BORDER RADIUS FOR DEFAULT LAYOUT -->
         
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
            <tr>
              <td>
                
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td align="center">
                <img src="https://i.ibb.co/L8BGdVX/Rave-logo-2.png" id="logoBlock-4" border="0" alt="" width="208" style="display: block;">
              </td>
            </tr>
          </table>
          
    
        </td>
      </tr>
    </table>
    
    
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td align="center" class="bodyTitle" style="font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 700; line-height: 150%; color: #111111; text-transform: none; font-style: normal; text-decoration: none; text-align: center;">Welcome to Rave's Alpha Test!</td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
    
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" class="">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #ededf3; border-collapse: initial;" class="">
            <tr>
              <td height="0" class="spacingHeight-0" style="line-height: 0px; min-height: 0px;"></td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 0px;" class="">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td align="center" id="imageBlock-12">
                <img src="https://i.ibb.co/ygW3MG6/weldone-to-rave.png" border="0" alt="" width="640" style="display: block;">
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
    
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td class="bodyTitle" id="bodyText-14" style="font-family: 'Poppins', sans-serif; font-size: 14px; line-height: 150%; color: #6f6f6f;"><p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;">Hello Alpha Tester,</p>
    <p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;">Exciting news! You're now an Alpha Tester for Rave!</p>
    <p style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 600; line-height: 150%; color: #111111; text-transform: none; font-style: normal; text-decoration: none;">Here's your OTP for login: ${otp}</p>
    <p style="margin-top: 0px; margin-bottom: 0px; line-height: 150%;">Please keep this secure. Also, don't forget to join our 
    <a href="https://discord.gg/uQ7cVwdvWa" target="_blank">Discord</a> and follow us on 
    <a href="https://twitter.com/ravegamenft" target="_blank">Twitter</a> for updates and discussions.<br></p>
    </td>
            </tr>
          </table>
          
    
        </td>
      </tr>
    </table>
   
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="width: 100%; min-width: 100%;">
            <tr>
              <td align="center">
    
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; min-width: 100%;">
                  <tr>
                    <td align="center" class="mlContentButton" style="font-family: 'Poppins', sans-serif;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://preview.mailerlite.io/te/cl/eyJ2Ijoie1wiYVwiOjQwMTU2NCxcImxcIjoxMDg0MzkxNDkxMDM1NDc3OTYsXCJyXCI6MTA4NDM5Mzg3NTg3NDc5MTkzfSIsInMiOiJiYzA0NmJhZTJhMzQ2NmFmIn0" style="height:42px;v-text-anchor:middle;width:407px;" arcsize="6%" stroke="f" fillcolor="#F71278">
                      <w:anchorlock/>
                      <center>
                      <![endif]-->
                      <!--[if mso]>
                      </center>
                      </v:roundrect>
                      <![endif]-->
                    </td>
                    
                    
                  </tr>
                </table>
    
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td class="bodyTitle" id="bodyText-18" style="font-family: 'Poppins', sans-serif; font-size: 14px; line-height: 150%; color: #6f6f6f;">
              <p style="margin-top: 0px; margin-bottom: 10px; line-height: 100%;"><em>Remember, top leaderboard performers will be rewarded!</em></p>
    
    <p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;">Race, explore, and let us know your feedback. Enjoy the journey in Rave!</p>
    
        <p height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></p>
    <p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;">Best,</p>
    <p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;">Rave Team</p>
    <p style="margin-top: 0px; margin-bottom: 0px; line-height: 150%;"><br></p></td>
            </tr>
          </table>
          
    
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" class="">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #ededf3; border-collapse: initial;" class="">
            <tr>
              <td height="0" class="spacingHeight-0" style="line-height: 0px; min-height: 0px;"></td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
      <!--  -->
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" class="">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #ededf3; border-collapse: initial;" class="">
            <tr>
              <td height="0" class="spacingHeight-0" style="line-height: 0px; min-height: 0px;"></td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
                  
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    <!--  -->
    
    
    
    <table align="center" border="0" bgcolor="#ffffff" class="mlContentTable mlContentTableFooterDefault" cellpadding="0" cellspacing="0" width="640">
      <tr>
        <td class="mlContentTableFooterCardTd">
    
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
            <tr>
              <td>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td align="center" style="padding: 0px 150px;" class="mlContentOuter">
    
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td align="center">
    
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr>
                    
                    <td align="center" width="24" style="padding: 0px 5px;" ng-show="slink.link != ''">
                      <a href="https://twitter.com/ravegamenft" target="_self" data-link-id="108439149187433890">
                        <img width="24" alt="twitter" src="https://assets.mlcdn.com/ml/images/icons/default/round/color/x.png" style="display: block;" border="0">
                      </a>
                    </td>
                    <td align="center" width="24" style="padding: 0px 5px;" ng-show="slink.link != ''">
                      <a href="https://www.youtube.com/@RavegameNFT" target="_self" data-link-id="108439149193725347">
                        <img width="24" alt="youtube" src="https://assets.mlcdn.com/ml/images/icons/default/round/color/youtube.png" style="display: block;" border="0">
                      </a>
                    </td><td align="center" width="24" style="padding: 0px 5px;" ng-show="slink.link != ''">
                      <a href="https://discord.gg/uQ7cVwdvWa" target="_self" data-link-id="108439149273417141">
                        <img width="24" alt="discord" src="https://assets.mlcdn.com/ml/images/icons/default/round/color/discord.png" style="display: block;" border="0">
                      </a>
                    </td>
                    
                    <td align="center" width="24" style="padding: 0px 5px;" ng-show="slink.link != ''">
                      <a href="https://ravegame.net/" target="_self" data-link-id="108439149318505920">
                        <img width="24" alt="website" src="https://w7.pngwing.com/pngs/639/449/png-transparent-computer-icons-website-icon-text-globe-symmetry.png" style="display: block;" border="0">
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td height="20" class="spacingHeight-20"></td>
            </tr>
            <tr>
              <td align="center" class="bodyTitle" style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; line-height: 150%; color: #111111;">Rave</td>
            </tr>
            <tr>
              <td align="center" class="bodyTitle" id="footerText-24" style="font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%; color: #111111;"><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 10px;">Rave is a NFT car racing metaverse gamefi 2.0. Rave replicates the real-life car racing experience with upgradable NFT cars, allowing ravers to collect, customize, rave and earn.</span></p></td>
            </tr>
            <tr>
              <td height="25" class="spacingHeight-20"></td>
            </tr>
          
            <tr>
              <td height="10"></td>
            </tr>
                   
    
          </table>
        </td>
      </tr>
    </table>
    
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
      <tr>
        <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
      </tr>
    </table>
    
                
              </td>
            </tr>
          </table>
    
        </td>
      </tr>
    </table>
    
    
    
              </td>
            </tr>
    
          </table>
    
          <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable">
      <tr>
        <td height="40" class="spacingHeight-20"></td>
      </tr>
      
      
    </table>
    
    
          <!-- Content ends here -->
    
          <!--[if mso 16]>
          </td>
          </tr>
          </table>
          <!--<![endif]-->
    
          <!--[if !mso]><!-- -->
        </td>
      </tr>
    </table>
    <!--<![endif]-->
    
    </div>
    </body>
    </html>
        
    `, // html body
  });
  console.log(otp);

  return true;
}
