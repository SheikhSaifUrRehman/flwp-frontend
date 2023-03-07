import React from 'react';

const PrivacyPolicy = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='policy-page'>
      <div className='container my-5 py-4 px-3 '>
        <h3>FreeLancer Workplace Global Privacy Policy</h3>
        <p>Last Updated: Sep 21, 2021</p>

        <div className='mt-4'>
          <p>
            If you choose to use our Service, then you agree to the
            collection and use of information in relation to this
            policy. The Personal Identification Information that we
            collect is used for providing and improving the Service.
            We will not use or share your information with
            anyone.FreeLancer Workplace
          </p>
          <p>
            The personal information you provide on FreeLancer Workplace when you
            fill out your profile is public, such as your name,
            location, gender, profile picture, Skills . your profile
            would be shown to the users who are registered with
            FreeLancer Workplace application.
          </p>
          <p>
            We use your data to connect you with other Users to enable
            the posting of, selection for, completion of, and payment
            for Tasks, in order to fulfill our contracts with Users;
            For billing and fraud prevention, on the basis of our
            legitimate interests in ensuring a safe and secure
            environment in which Clients and Taskers can meet and
            conduct business, and in order to comply with our legal
            obligations; To conduct identification and criminal
            background checks, if applicable and to the extent
            permitted by local law, on Users, in order to advance our
            legitimate interests as well as for the substantial public
            interest of ensuring the safety of our Users both online
            and offline, preventing or detecting unlawful acts,
            protecting the public against dishonesty, and maintaining
            the integrity of the FreeLancer Workplace Platform given that Taskers
            often interact directly with Clients and may enter their
            homes.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
