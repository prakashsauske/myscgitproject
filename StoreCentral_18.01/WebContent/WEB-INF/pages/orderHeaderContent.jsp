<div class="ContentTableWrapper mainTableWrapper">
        <div class="tableInfo orderTitle">
          <div class="tableTitle">
            <h4>
      <strong>
        List of Orders
      </strong>
    </h4> </div>
          <!-- End of table title -->
        </div>
        <!-- End of table info -->
        <div id="tabs" class="tabs">
          <ul id="listOfTabs">
            <li class="createOrdersTab"> <a href="#tabs-3" class="">
        Create Orders
      </a> </li>
            <li class="highlightTab allocationTabLi ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="tabs-5" aria-labelledby="ui-id-16" aria-selected="false" aria-expanded="false"> <a href="#tabs-5" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-16">
        Check Allocations
      </a>
              <input type="hidden" id="hasAllocData" value="false" /> </li>
          </ul>
          <div id="tabs-6" class="overdueTab hideBlock">
            <div class="ContentTableWrapper overdueTableWrapper" id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of Overdue orders 
            </strong>
          </h5> </div>
                <!-- End of table title -->
                <div class="paginationWrapper hideBlock paginationDivoverdueTable" id="paginationDivOverdue">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
              </div>
              <!-- End of table info -->
              <table cellspacing="0" class="ContentTable sortTableoverdueTable tableSorter actionRows" id="overdueTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class="lastColumn numberColumn" width="7%"> Total Pallets </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tab-6 -->
          <div id="tabs-1" class="readyTab hideBlock">
            <div class="ContentTableWrapper readyTableWrapper " id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of Authorised and Dispatched orders 
            </strong>
          </h5> </div>
                <!-- End of table title -->
                <div class="paginationWrapper hideBlock paginationDivreadyTable" id="paginationDivReady">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
              </div>
              <!-- End of table info -->
              <div class="errorDiv hideBlock" id="readyErrorMsgDiv">
                <label class="errorMsg"> </label>
                <label class="closeMessage" onclick="$(this).parent().addClass('hideBlock');"> &nbsp; </label>
              </div>
              <table cellspacing="0" class="ContentTable sortTablereadyTable tableSorter actionRows" id="readyTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class="lastColumn numberColumn" width="7%"> Total Pallets </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tabs-1 -->
          <div id="tabs-2" class="openTab hideBlock">
            <div class="ContentTableWrapper openTableWrapper" id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of Open orders to view and update 
            </strong>
          </h5> </div>
                <div class="paginationWrapper hideBlock paginationDivopenTable" id="paginationDivOpen">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
                <!-- End of table title -->
              </div>
              <!-- End of table info -->
              <table cellspacing="0" class="ContentTable sortTableopenTable tableSorter actionRows" id="openTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class=" numberColumn" width="7%"> Total Pallets </th>
                    <th data_prop="cut_off_date" class="lastColumn " width="12%"> Cut-off Time </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tab-2 -->
          <div id="tabs-4" class="fullyTab hideBlock">
            <div class="ContentTableWrapper fullyTableWrapper " id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of Fully Received orders 
            </strong>
          </h5> </div>
                <div class="paginationWrapper hideBlock paginationDivfullyTable" id="paginationDivFully">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
                <!-- End of table title -->
              </div>
              <!-- End of table info -->
              <table cellspacing="0" class="ContentTable sortTablefullyTable tableSorter actionRows" id="fullyTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class="lastColumn numberColumn" width="7%"> Total Pallets </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tabs-1 -->
          <div id="tabs-7" class="ibtOutTab hideBlock">
            <div class="ContentTableWrapper ibtOutTableWrapper" id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of IBT Out orders 
            </strong>
          </h5> </div>
                <!-- End of table title -->
                <div class="paginationWrapper hideBlock paginationDivibtOutTable" id="paginationDivIbtOut">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
              </div>
              <!-- End of table info -->
              <table cellspacing="0" class="ContentTable sortTableibtOutTable tableSorter actionRows" id="ibtOutTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class="lastColumn numberColumn" width="7%"> Total Pallets </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tab-7 -->
          <div id="tabs-8" class="cancelledTab hideBlock">
            <div class="ContentTableWrapper cancelledTableWrapper" id="">
              <div class="tableInfo">
                <div class="tableTitle">
                  <h5 class="sectionTitle">
            <strong>
              List of Cancelled orders 
            </strong>
          </h5> </div>
                <!-- End of table title -->
                <div class="paginationWrapper hideBlock paginationDivcancelledTable" id="paginationDivCancelled">
                  <div class="pagination-holder clearfix">
                    <div id="compact-pagination" class="compact-theme simple-pagination"> </div>
                  </div>
                </div>
              </div>
              <!-- End of table info -->
              <table cellspacing="0" class="ContentTable sortTablecancelledTable tableSorter actionRows" id="cancelledTable">
                <thead class="table-sort-hdr">
                  <tr>
                    <th data_prop="order_no" width="7%"> Order # </th>
                    <th data_prop="delv_date" class="centerValue" width="7%"> Delivery Date </th>
                    <th data_prop="order_status" class="centerValue" width="12%"> Status </th>
                    <th data_prop="supplier_name"> Supplier </th>
                    <th data_prop="order_type" class="" width="12%"> Type </th>
                    <th data_prop="source" class="" width="7%"> Source </th>
                    <th data_prop="total_cartons" class="numberColumn" width="7%"> Total Cartons </th>
                    <th data_prop="total_pallets" class="lastColumn numberColumn" width="7%"> Total Pallets </th>
                  </tr>
                </thead>
                <tbody> </tbody>
              </table>
            </div>
            <!-- End of Content Table Wrapper -->
          </div>
          <!-- End of tab-8 -->
          <!----------------------------------------Create Orders sepated in create JSP      -------------------------------->
          <%@include file="createOrdersNew.jsp" %>
            <!----------------------------------------------------------------------------------------------------------------->
            <div id="tabs-5" class="allocationTab hideBlock">
              <div class="ContentTableWrapper allocationTableWrapper">
                <div class="tableInfo">
                  <div class="tableTitle">
                    <h5 class="sectionTitle">
              <strong>
                List of Allocations
              </strong>
            </h5> </div>
                  <!-- End of table title -->
                </div>
                <!-- End of table info -->
                <div class="errorDiv hideBlock" id="allocationErrorMsgDiv" style="padding-top: 20px;">
                  <label class="errorMsg"> </label>
                  <label class="closeMessage" onclick="$(this).parent().addClass('hideBlock');"> &nbsp; </label>
                </div>
                <div class="tableActionsBtnsWrapper">
                  <div class="lookupActionWrapper">
                    <label class="linkBtn" id="alloc_filterOpen">
                      <label class="filter"> Filters </label>
                    </label>
                    <label class="linkBtn hideBlock" id="alloc_filterClear">
                      <label class="negativeFlag"> Clear Filters </label>
                    </label>
                  </div>
                  <!-- End of lookup action wrapper -->
                </div>
                <!-- End of table actions btn wrapper -->
                <table cellspacing="0" class="ContentTable sortTableallocationTable treetable drilldownTable " id="allocationTable">
                  <thead class="hdrMain table-sort-hdr">
                    <tr>
                      <th class="noSort expander" width="15px" colspan="1"> <span class="indenter ">
                  <a title="Expand All"
                  class="expandAll mainTr" id="expandAllInAlloc">
                    &nbsp;
                  </a>
                  
                  <a
                  title="Collapse All" class="collapseAll mainTr hideBlock"
                  id="collapseAllInAlloc">
                    &nbsp;
                  </a>
                  
                </span> </th>
                      <th data_prop="onShowDate" width="90px"> On Show Date </th>
                      <th data_prop="allocationNo"> Allocation # </th>
                      <th data_prop="allocationDesc"> Allocation Description </th>
                      <th data_prop="allocationReason"> Reason </th>
                      <th class=" allocationDepts lastColumn"> Department </th>
                    </tr>
                    <tr class="filterRowAllocation hideBlock drillsOpenDefault">
                      <td> &nbsp; </td>
                      <td>
                        <input class="textbox inputDate FilterAlloc" placeholder="dd/mm/yyyy" data-filterfor="onShowDate"> </td>
                      <td>
                        <input class="textbox FilterAlloc" data-filterfor="allocationNo"> </td>
                      <td class="columnDivider">
                        <input class="textbox FilterAlloc" data-filterfor="allocationDesc"> </td>
                      <td>
                        <input class="textbox  FilterAlloc" data-filterfor="allocationReason" id=""> </td>
                      <td>
                        <input class="textbox  FilterAlloc" data-filterfor="allocationDepts"> </td>
                    </tr>
                  </thead>
                  <tbody id="allocationTableBody"> </tbody>
                </table>
              </div>
              <!-- End of content table wrappe			-->
            </div>
            <!-- End of tab-5 -->
        </div>
        <!-- End of tabs -->
      </div>