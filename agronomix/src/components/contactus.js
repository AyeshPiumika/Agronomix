import React from "react";

export const ContactUs = () => {
  return (
    <div className="container shadow-none p-3 mb-5 bg-body-tertiary rounded">
      <div className="row">
        <div className="col-md-8">
          <iframe
            width="100%"
            height="350"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=15+Springfield+Way,+Hythe,+CT21+5SH&aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"
            title="Google Map"
          ></iframe>{" "}
        </div>
        <div className="col-md-4">
          <h2> Agronomix </h2>{" "}
          <address>
            <strong> Cultivate Tomorrow 's Harvest Today</strong> <br />
            20 / 5 <br />
            Church Road <br />
            Colombe <br />
            Sri Lanka <br />
            Email Addres : agronomix@gmail.com <br />
            <abbr title="Phone"> P: </abbr> 01234 567 890{" "}
          </address>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ContactUs;
