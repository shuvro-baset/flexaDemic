import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

const CourseEnroll = () => {

    const {user} = useFirebase();
    const email = user.email;
    const {courseId} = useParams();
    const [courseDetails, setCourseDetails] = useState({});

    const addressRef = useRef();
    const mobileRef = useRef();

    console.log(courseDetails);
    useEffect(() => {
        fetch(`http://localhost:5000/course/${courseId}`)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            setCourseDetails(data)})
    }, [courseId]);


    const handleCourseEnroll = (e) => {
        e.preventDefault();
        const address = addressRef.current.value;
        addressRef.current.value = "";
        const mobile = mobileRef.current.value;
        mobileRef.current.value = "";
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('courseId', courseId);
        formData.append('address', address);
        formData.append('mobile', mobile);
        formData.append('courseTitle', courseDetails.title);
        formData.append('courseDescription', courseDetails.description);
        formData.append('courseFee', courseDetails.fees);
        formData.append('courseDuration', courseDetails.duration);
        formData.append('courseImage', courseDetails.image);

        // console.log(formData);
        fetch('http://localhost:5000/course-enroll', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(result=> {
            console.log("success:", result);
            if (result.insertedId) {
                alert('course content added successfully');
            }
          })
          .catch(err => {
            console.log("error:", err);
          })
    
      };
    

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center my-5">
                <div className="col-md-6">

                    <h4>Course Information</h4>
                    <img className="img-fluid" src={`data:image/png;base64, ${courseDetails.image}`} alt="" />
                    <div>
                        <h2>{courseDetails.title}</h2>
                        <p>{courseDetails.description}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center mt-3">Enroll course</h2>
                    <h6 className="text-center mt-3">Personal Info</h6>
                        <form action="" onSubmit={handleCourseEnroll}>
                        <div className="form-floating mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Content-1"
                            ref={addressRef} required
                            />
                            <label>address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Content-2"
                            ref={mobileRef} required
                            />
                            <label>Mobile Number</label>
                        </div>                  
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary w-100" type="submit">Submit</button>
                        </div>
                        </form>
                </div>
            </Row>
        </Container>
    );
};

export default CourseEnroll;