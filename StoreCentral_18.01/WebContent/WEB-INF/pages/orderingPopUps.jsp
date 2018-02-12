 <!-- verify supplier pop up-->
    <div id="dialog-alertBox" title="Order Enquiry">
      <div class="popupContent">
        <div class="popupData">
          <h4 class="alertText" id="alertBox">
              There is no article to be
              received. Cannot finalize the order.
            </h4>
          <div class="popupActionsWrapper"> <span class="popupActions">
                
                <label class="actionBtn"
                id="okBtn">
                  OK
                </label>
              </span> </div>
          <!-- End of popup actions-->
        </div>
        <!-- End of popupContent -->
      </div>
      <!-- verify supplier pop up-->
      <div id="dialog-verifySupplier" title="Verify Supplier">
        <div class="popupContent">
          <!-- End of popup search wrapper -->
          <div class="popupData" id="popupDataDivEnq"> </div>
          <!-- End of pop up data -->
          <div class="popupActions hideBlock">
            <label class="actionBtn"> Select & Close </label>
            <label class="actionBtn"> Cancel </label>
          </div>
        </div>
      </div>
      </div>
      <%@include file="OrderCreationPopup.jsp" %>
      <%@include file="printerPopUp.jsp"%>
      
                  <!-- ganesh start -->
                  <div id="dialog-session" title="Resume Receiving Session">
                    <div class="popupContent">
                      <div class="popupData popupTitle">
                        <h4 class="warning">
                    There are few articles in this order are 
                    <strong>
                      captured as received
                    </strong>
                    in the system.
                  </h4>
                        <h4 class="warning">
                    Resume previous session or start a new session to receive articles. 
                  </h4> <strong>
                    OR
                  </strong>
                        <h4 class="warning">
                    There are few articles in this order are 
                    <strong>
                      received by James Smith
                    </strong>
                    in previous session.
                  </h4>
                        <h4 class="warning">
                    Resume previous session or start a new session to receive articles. 
                  </h4> <span class="popupActions">
                    <label class="actionBtn" id="resumeSess">
                      <a href="#">
                        Resume Session
                      </a>
                    </label>
                    <label class="secondaryActionBtn" id="newSess">
                      <a href="#">
                        New Session
                      </a>
                    </label>
                  </span> </div>
                    </div>
                  </div>
                  <!-- ganesh end -->
                       <div class="popupActionsWrapper"> <span class="popupActions">
                     
                     <label class="actionBtn" id="deptHieSelect">
                       Select
                     </label>
<label class="secondaryActionBtn" id="deptHieCancel">
                       Cancel
                     </label>
                   </span> </div>
                       <!-- End of popup actions-->
                </div>
                <!-- End of pop up data -->
              </div>
              <!-- End of popupContent -->
            </div>
            
<%@include file="orderReceive.jsp"%>
<%@include file="updateReceivedQuantity.jsp"%>
<%@include file="orderDetailInclude.jsp"%>
<%@include file="orderDetailIncludeNew.jsp"%>