package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleNutritionalResult {

	@JsonProperty("matnr")
	private String matnr;
	@JsonProperty("zznip_init_stat")
	private String zznipInitStat;
	@JsonProperty("zzeffective_date")
	private String zzEffectiveDate;
	@JsonProperty("zzapproval_stat")
	private String zzApprovalStat;
	@JsonProperty("zzhazard_goods")
	private String zzHazardGoods;
	@JsonProperty("zzhaz_unit_code")
	private String zzHazUnitCode;
	@JsonProperty("zzhaz_unit_vol")
	private String zzHazUnitVol;
	@JsonProperty("zzhazard_class")
	private String zzHazardClass;
	@JsonProperty("zzhaz_subsid_cde")
	private String zzHazSubsidCde;
	@JsonProperty("zzhaz_pack_group")
	private String zzHazPackGroup;
	@JsonProperty("zzodour_ind")
	private String zzOdourInd;
	@JsonProperty("zzethylene_ind")
	private String zzEthyleneInd;
	@JsonProperty("zztray_id")
	private String zzTrayId;
	@JsonProperty("zzsoaker_qty")
	private String zzSoakerQty;
	@JsonProperty("zzwraps_qty")
	private String zzWrapsQty;

	@JsonProperty("zzlabel_form_id")
	private String zzLabelFormId;
	@JsonProperty("zzlabel_desc_1")
	private String zzLabelDesc1;
	@JsonProperty("zzlabel_desc_2")
	private String zzLabelDesc2;
	@JsonProperty("zzprnt_pack_dat")
	private String zzPrntPackDat;
	@JsonProperty("zzprnt_pack_tim")
	private String zzPrntPackTim;
	//@JsonProperty("zzpi_uom")
	private String zzPiUom;
	@JsonProperty("zztare_code")
	private String zzTareCode;
	@JsonProperty("zzscale_article")
	private String zzScaleArticle;
	@JsonProperty("zzmand_warning")
	private String zzMandWarning;
	@JsonProperty("zznutrition_clm")
	private String zzNutritionClm;
	@JsonProperty("zzstrg_reqmnt")
	private String zzStrgReqmnt;
	@JsonProperty("zzcountry_orign")
	private String zzCountryOrign;
	@JsonProperty("zzsrv_per_pack")
	private String zzSrvPerPack;
	@JsonProperty("zzsrv_size")
	private String zzSrvSize;
	//@JsonProperty("zzsrv_size_uom")
	private String zzSrvSizeUom;

	@JsonProperty("zzwrap_tare")
	private String wrapTare;

	@JsonProperty("zznutrient_01")
	private String zzNutrient01;
	@JsonProperty("zzserve_qty_01")
	private String zzServeQty01;
	//@JsonProperty("zzserve_uom_01")
	private String zzServeUom01;
	@JsonProperty("zzper100_qty_01")
	private String zzPer100Qty01;
	//@JsonProperty("zzper100_uom_01")
	private String zzPer100Uom01;

	@JsonProperty("zznutrient_02")
	private String zzNutrient02;
	@JsonProperty("zzserve_qty_02")
	private String zzServeQty02;
	//@JsonProperty("zzserve_uom_02")
	private String zzServeUom02;
	@JsonProperty("zzper100_qty_02")
	private String zzPer100Qty02;
	//@JsonProperty("zzper100_uom_02")
	private String zzPer100Uom02;

	@JsonProperty("zznutrient_03")
	private String zzNutrient03;
	@JsonProperty("zzserve_qty_03")
	private String zzServeQty03;
	//@JsonProperty("zzserve_uom_03")
	private String zzServeUom03;
	@JsonProperty("zzper100_qty_03")
	private String zzPer100Qty03;
	//@JsonProperty("zzper100_uom_03")
	private String zzPer100Uom03;

	@JsonProperty("zznutrient_04")
	private String zzNutrient04;
	@JsonProperty("zzserve_qty_04")
	private String zzServeQty04;
	//@JsonProperty("zzserve_uom_04")
	private String zzServeUom04;
	@JsonProperty("zzper100_qty_04")
	private String zzPer100Qty04;
	//@JsonProperty("zzper100_uom_04")
	private String zzPer100Uom04;

	@JsonProperty("zznutrient_05")
	private String zzNutrient05;
	@JsonProperty("zzserve_qty_05")
	private String zzServeQty05;
	//@JsonProperty("zzserve_uom_05")
	private String zzServeUom05;
	@JsonProperty("zzper100_qty_05")
	private String zzPer100Qty05;
	//@JsonProperty("zzper100_uom_05")
	private String zzPer100Uom05;

	@JsonProperty("zznutrient_06")
	private String zzNutrient06;
	@JsonProperty("zzserve_qty_06")
	private String zzServeQty06;
	//@JsonProperty("zzserve_uom_06")
	private String zzServeUom06;
	@JsonProperty("zzper100_qty_06")
	private String zzPer100Qty06;
	//@JsonProperty("zzper100_uom_06")
	private String zzPer100Uom06;

	@JsonProperty("zznutrient_07")
	private String zzNutrient07;
	@JsonProperty("zzserve_qty_07")
	private String zzServeQty07;
	//@JsonProperty("zzserve_uom_07")
	private String zzServeUom07;
	@JsonProperty("zzper100_qty_07")
	private String zzPer100Qty07;
	//@JsonProperty("zzper100_uom_07")
	private String zzPer100Uom07;

	@JsonProperty("zznutrient_08")
	private String zzNutrient08;
	@JsonProperty("zzserve_qty_08")
	private String zzServeQty08;
	//@JsonProperty("zzserve_uom_08")
	private String zzServeUom08;
	@JsonProperty("zzper100_qty_08")
	private String zzPer100Qty08;
	//@JsonProperty("zzper100_uom_08")
	private String zzPer100Uom08;

	@JsonProperty("zznutrient_09")
	private String zzNutrient09;
	@JsonProperty("zzserve_qty_09")
	private String zzServeQty09;
	//@JsonProperty("zzserve_uom_09")
	private String zzServeUom09;
	@JsonProperty("zzper100_qty_09")
	private String zzPer100Qty09;
	//@JsonProperty("zzper100_uom_09")
	private String zzPer100Uom09;

	@JsonProperty("zznutrient_10")
	private String zzNutrient10;
	@JsonProperty("zzserve_qty_10")
	private String zzServeQty10;
	//@JsonProperty("zzserve_uom_10")
	private String zzServeUom10;
	@JsonProperty("zzper100_qty_10")
	private String zzPer100Qty10;
	//@JsonProperty("zzper100_uom_10")
	private String zzPer100Uom10;

	@JsonProperty("zznutrient_11")
	private String zzNutrient11;
	@JsonProperty("zzserve_qty_11")
	private String zzServeQty11;
	//@JsonProperty("zzserve_uom_11")
	private String zzServeUom11;
	@JsonProperty("zzper100_qty_11")
	private String zzPer100Qty11;
	//@JsonProperty("zzper100_uom_11")
	private String zzPer100Uom11;

	@JsonProperty("zznutrient_12")
	private String zzNutrient12;
	@JsonProperty("zzserve_qty_12")
	private String zzServeQty12;
	//@JsonProperty("zzserve_uom_12")
	private String zzServeUom12;
	@JsonProperty("zzper100_qty_12")
	private String zzPer100Qty12;
	//@JsonProperty("zzper100_uom_12")
	private String zzPer100Uom12;

	@JsonProperty("zznutrient_13")
	private String zzNutrient13;
	@JsonProperty("zzserve_qty_13")
	private String zzServeQty13;
	//@JsonProperty("zzserve_uom_13")
	private String zzServeUom13;
	@JsonProperty("zzper100_qty_13")
	private String zzPer100Qty13;
	//@JsonProperty("zzper100_uom_13")
	private String zzPer100Uom13;

	@JsonProperty("zznutrient_14")
	private String zzNutrient14;
	@JsonProperty("zzserve_qty_14")
	private String zzServeQty14;
	//@JsonProperty("zzserve_uom_14")
	private String zzServeUom14;
	@JsonProperty("zzper100_qty_14")
	private String zzPer100Qty14;
	//@JsonProperty("zzper100_uom_14")
	private String zzPer100Uom14;

	@JsonProperty("zzprod_ingrd_01")
	private String zzProdIngrd01;
	@JsonProperty("zzprod_ingrd_02")
	private String zzProdIngrd02;
	@JsonProperty("zzprod_ingrd_03")
	private String zzProdIngrd03;
	@JsonProperty("zzprod_ingrd_04")
	private String zzProdIngrd04;
	@JsonProperty("zzprod_ingrd_05")
	private String zzProdIngrd05;
	@JsonProperty("zzprod_ingrd_06")
	private String zzProdIngrd06;
	@JsonProperty("zzprod_ingrd_07")
	private String zzProdIngrd07;
	@JsonProperty("zzprod_ingrd_08")
	private String zzProdIngrd08;
	@JsonProperty("zzprod_ingrd_09")
	private String zzProdIngrd09;
	@JsonProperty("zzprod_ingrd_10")
	private String zzProdIngrd10;
	@JsonProperty("zzprod_ingrd_11")
	private String zzProdIngrd11;
	@JsonProperty("zzprod_ingrd_12")
	private String zzProdIngrd12;
	@JsonProperty("zzprod_ingrd_13")
	private String zzProdIngrd13;
	@JsonProperty("zzprod_ingrd_14")
	private String zzProdIngrd14;
	@JsonProperty("zzprod_ingrd_15")
	private String zzProdIngrd15;
	@JsonProperty("zzprod_ingrd_16")
	private String zzProdIngrd16;
	@JsonProperty("zzprod_ingrd_17")
	private String zzProdIngrd17;
	@JsonProperty("zzprod_ingrd_18")
	private String zzProdIngrd18;

	@JsonProperty("zzchksum_ffmsg")
	private String zzChksumFfmsg;
	@JsonProperty("zzchksum_ffnip")
	private String zzChksumFfnip;
	@JsonProperty("zzchksum_ffnote")
	private String zzChksumFfnote;
	@JsonProperty("zzchksum_frfood")
	private String zzChksumFrfood;

	@JsonProperty("matnr ")
	private String matnr_m;
	@JsonProperty("zznipInitStat ")
	private String zznipInitStat_m;
	@JsonProperty("zzEffectiveDate ")
	private String zzEffectiveDate_m;
	@JsonProperty("zzApprovalStat ")
	private String zzApprovalStat_m;
	@JsonProperty("zzHazardGoods ")
	private String zzHazardGoods_m;
	@JsonProperty("zzHazUnitCode ")
	private String zzHazUnitCode_m;
	@JsonProperty("zzHazUnitVol ")
	private String zzHazUnitVol_m;
	@JsonProperty("zzHazardClass ")
	private String zzHazardClass_m;
	@JsonProperty("zzHazSubsidCde ")
	private String zzHazSubsidCde_m;
	@JsonProperty("zzHazPackGroup ")
	private String zzHazPackGroup_m;
	@JsonProperty("zzOdourInd ")
	private String zzOdourInd_m;
	@JsonProperty("zzEthyleneInd ")
	private String zzEthyleneInd_m;
	@JsonProperty("zzTrayId ")
	private String zzTrayId_m;
	@JsonProperty("zzSoakerQty ")
	private String zzSoakerQty_m;
	@JsonProperty("zzWrapsQty ")
	private String zzWrapsQty_m;
	@JsonProperty("zzLabelFormId ")
	private String zzLabelFormId_m;
	@JsonProperty("zzLabelDesc1 ")
	private String zzLabelDesc1_m;
	@JsonProperty("zzLabelDesc2 ")
	private String zzLabelDesc2_m;
	@JsonProperty("zzPrntPackDat ")
	private String zzPrntPackDat_m;
	@JsonProperty("zzPrntPackTim ")
	private String zzPrntPackTim_m;
	@JsonProperty("zzPiUom ")
	private String zzPiUom_m;
	@JsonProperty("zzTareCode ")
	private String zzTareCode_m;
	@JsonProperty("zzScaleArticle ")
	private String zzScaleArticle_m;
	@JsonProperty("zzMandWarning ")
	private String zzMandWarning_m;
	@JsonProperty("zzNutritionClm ")
	private String zzNutritionClm_m;
	@JsonProperty("zzStrgReqmnt ")
	private String zzStrgReqmnt_m;
	@JsonProperty("zzCountryOrign ")
	private String zzCountryOrign_m;
	@JsonProperty("zzSrvPerPack ")
	private String zzSrvPerPack_m;
	@JsonProperty("zzSrvSize ")
	private String zzSrvSize_m;
	@JsonProperty("zzSrvSizeUom ")
	private String zzSrvSizeUom_m;
	@JsonProperty("wrapTare ")
	private String wrapTare_m;
	@JsonProperty("zzNutrient01 ")
	private String zzNutrient01_m;
	@JsonProperty("zzServeQty01 ")
	private String zzServeQty01_m;
	@JsonProperty("zzServeUom01 ")
	private String zzServeUom01_m;
	@JsonProperty("zzPer100Qty01 ")
	private String zzPer100Qty01_m;
	@JsonProperty("zzPer100Uom01 ")
	private String zzPer100Uom01_m;
	@JsonProperty("zzNutrient02 ")
	private String zzNutrient02_m;
	@JsonProperty("zzServeQty02 ")
	private String zzServeQty02_m;
	@JsonProperty("zzServeUom02 ")
	private String zzServeUom02_m;
	@JsonProperty("zzPer100Qty02 ")
	private String zzPer100Qty02_m;
	@JsonProperty("zzPer100Uom02 ")
	private String zzPer100Uom02_m;
	@JsonProperty("zzNutrient03 ")
	private String zzNutrient03_m;
	@JsonProperty("zzServeQty03 ")
	private String zzServeQty03_m;
	@JsonProperty("zzServeUom03 ")
	private String zzServeUom03_m;
	@JsonProperty("zzPer100Qty03 ")
	private String zzPer100Qty03_m;
	@JsonProperty("zzPer100Uom03 ")
	private String zzPer100Uom03_m;
	@JsonProperty("zzNutrient04 ")
	private String zzNutrient04_m;
	@JsonProperty("zzServeQty04 ")
	private String zzServeQty04_m;
	@JsonProperty("zzServeUom04 ")
	private String zzServeUom04_m;
	@JsonProperty("zzPer100Qty04 ")
	private String zzPer100Qty04_m;
	@JsonProperty("zzPer100Uom04 ")
	private String zzPer100Uom04_m;
	@JsonProperty("zzNutrient05 ")
	private String zzNutrient05_m;
	@JsonProperty("zzServeQty05 ")
	private String zzServeQty05_m;
	@JsonProperty("zzServeUom05 ")
	private String zzServeUom05_m;
	@JsonProperty("zzPer100Qty05 ")
	private String zzPer100Qty05_m;
	@JsonProperty("zzPer100Uom05 ")
	private String zzPer100Uom05_m;
	@JsonProperty("zzNutrient06 ")
	private String zzNutrient06_m;
	@JsonProperty("zzServeQty06 ")
	private String zzServeQty06_m;
	@JsonProperty("zzServeUom06 ")
	private String zzServeUom06_m;
	@JsonProperty("zzPer100Qty06 ")
	private String zzPer100Qty06_m;
	@JsonProperty("zzPer100Uom06 ")
	private String zzPer100Uom06_m;
	@JsonProperty("zzNutrient07 ")
	private String zzNutrient07_m;
	@JsonProperty("zzServeQty07 ")
	private String zzServeQty07_m;
	@JsonProperty("zzServeUom07 ")
	private String zzServeUom07_m;
	@JsonProperty("zzPer100Qty07 ")
	private String zzPer100Qty07_m;
	@JsonProperty("zzPer100Uom07 ")
	private String zzPer100Uom07_m;
	@JsonProperty("zzNutrient08 ")
	private String zzNutrient08_m;
	@JsonProperty("zzServeQty08 ")
	private String zzServeQty08_m;
	@JsonProperty("zzServeUom08 ")
	private String zzServeUom08_m;
	@JsonProperty("zzPer100Qty08 ")
	private String zzPer100Qty08_m;
	@JsonProperty("zzPer100Uom08 ")
	private String zzPer100Uom08_m;
	@JsonProperty("zzNutrient09 ")
	private String zzNutrient09_m;
	@JsonProperty("zzServeQty09 ")
	private String zzServeQty09_m;
	@JsonProperty("zzServeUom09 ")
	private String zzServeUom09_m;
	@JsonProperty("zzPer100Qty09 ")
	private String zzPer100Qty09_m;
	@JsonProperty("zzPer100Uom09 ")
	private String zzPer100Uom09_m;
	@JsonProperty("zzNutrient10 ")
	private String zzNutrient10_m;
	@JsonProperty("zzServeQty10 ")
	private String zzServeQty10_m;
	@JsonProperty("zzServeUom10 ")
	private String zzServeUom10_m;
	@JsonProperty("zzPer100Qty10 ")
	private String zzPer100Qty10_m;
	@JsonProperty("zzPer100Uom10 ")
	private String zzPer100Uom10_m;
	@JsonProperty("zzNutrient11 ")
	private String zzNutrient11_m;
	@JsonProperty("zzServeQty11 ")
	private String zzServeQty11_m;
	@JsonProperty("zzServeUom11 ")
	private String zzServeUom11_m;
	@JsonProperty("zzPer100Qty11 ")
	private String zzPer100Qty11_m;
	@JsonProperty("zzPer100Uom11 ")
	private String zzPer100Uom11_m;
	@JsonProperty("zzNutrient12 ")
	private String zzNutrient12_m;
	@JsonProperty("zzServeQty12 ")
	private String zzServeQty12_m;
	@JsonProperty("zzServeUom12 ")
	private String zzServeUom12_m;
	@JsonProperty("zzPer100Qty12 ")
	private String zzPer100Qty12_m;
	@JsonProperty("zzPer100Uom12 ")
	private String zzPer100Uom12_m;
	@JsonProperty("zzNutrient13 ")
	private String zzNutrient13_m;
	@JsonProperty("zzServeQty13 ")
	private String zzServeQty13_m;
	@JsonProperty("zzServeUom13 ")
	private String zzServeUom13_m;
	@JsonProperty("zzPer100Qty13 ")
	private String zzPer100Qty13_m;
	@JsonProperty("zzPer100Uom13 ")
	private String zzPer100Uom13_m;
	@JsonProperty("zzNutrient14 ")
	private String zzNutrient14_m;
	@JsonProperty("zzServeQty14 ")
	private String zzServeQty14_m;
	@JsonProperty("zzServeUom14 ")
	private String zzServeUom14_m;
	@JsonProperty("zzPer100Qty14 ")
	private String zzPer100Qty14_m;
	@JsonProperty("zzPer100Uom14 ")
	private String zzPer100Uom14_m;
	@JsonProperty("zzProdIngrd01 ")
	private String zzProdIngrd01_m;
	@JsonProperty("zzProdIngrd02 ")
	private String zzProdIngrd02_m;
	@JsonProperty("zzProdIngrd03 ")
	private String zzProdIngrd03_m;
	@JsonProperty("zzProdIngrd04 ")
	private String zzProdIngrd04_m;
	@JsonProperty("zzProdIngrd05 ")
	private String zzProdIngrd05_m;
	@JsonProperty("zzProdIngrd06 ")
	private String zzProdIngrd06_m;
	@JsonProperty("zzProdIngrd07 ")
	private String zzProdIngrd07_m;
	@JsonProperty("zzProdIngrd08 ")
	private String zzProdIngrd08_m;
	@JsonProperty("zzProdIngrd09 ")
	private String zzProdIngrd09_m;
	@JsonProperty("zzProdIngrd10 ")
	private String zzProdIngrd10_m;
	@JsonProperty("zzProdIngrd11 ")
	private String zzProdIngrd11_m;
	@JsonProperty("zzProdIngrd12 ")
	private String zzProdIngrd12_m;
	@JsonProperty("zzProdIngrd13 ")
	private String zzProdIngrd13_m;
	@JsonProperty("zzProdIngrd14 ")
	private String zzProdIngrd14_m;
	@JsonProperty("zzProdIngrd15 ")
	private String zzProdIngrd15_m;
	@JsonProperty("zzProdIngrd16 ")
	private String zzProdIngrd16_m;
	@JsonProperty("zzProdIngrd17 ")
	private String zzProdIngrd17_m;
	@JsonProperty("zzProdIngrd18 ")
	private String zzProdIngrd18_m;
	@JsonProperty("zzChksumFfmsg ")
	private String zzChksumFfmsg_m;
	@JsonProperty("zzChksumFfnip ")
	private String zzChksumFfnip_m;
	@JsonProperty("zzChksumFfnote ")
	private String zzChksumFfnote_m;
	@JsonProperty("zzChksumFrfood ")
	private String zzChksumFrfood_m;
	
	
	// New fields as on from R17.03
	@JsonProperty("pi_uom_case")
	private String piUomCase;
	@JsonProperty("srv_size_uom_case")
	private String srvSizeUomCase;
	@JsonProperty("serve_uom_01_case")
	private String serveUom01Case;
	@JsonProperty("serve_uom_02_case")
	private String serveUom02Case;
	@JsonProperty("serve_uom_03_case")
	private String serveUom03Case;
	@JsonProperty("serve_uom_04_case")
	private String serveUom04Case;
	@JsonProperty("serve_uom_05_case")
	private String serveUom05Case;
	@JsonProperty("serve_uom_06_case")
	private String serveUom06Case;
	@JsonProperty("serve_uom_07_case")
	private String serveUom07Case;
	@JsonProperty("serve_uom_08_case")
	private String serveUom08Case;
	@JsonProperty("serve_uom_09_case")
	private String serveUom09Case;
	@JsonProperty("serve_uom_10_case")
	private String serveUom10Case;
	@JsonProperty("serve_uom_11_case")
	private String serveUom11Case;
	@JsonProperty("serve_uom_12_case")
	private String serveUom12Case;
	@JsonProperty("serve_uom_13_case")
	private String serveUom13Case;
	@JsonProperty("serve_uom_14_case")
	private String serveUom14Case;
	@JsonProperty("per100_uom_01_case")
	private String per100Uom01Case;
	@JsonProperty("per100_uom_02_case")
	private String per100Uom02Case;
	@JsonProperty("per100_uom_03_case")
	private String per100Uom03Case;
	@JsonProperty("per100_uom_04_case")
	private String per100Uom04Case;
	@JsonProperty("per100_uom_05_case")
	private String per100Uom05Case;
	@JsonProperty("per100_uom_06_case")
	private String per100Uom06Case;
	@JsonProperty("per100_uom_07_case")
	private String per100Uom07Case;
	@JsonProperty("per100_uom_08_case")
	private String per100Uom08Case;
	@JsonProperty("per100_uom_09_case")
	private String per100Uom09Case;
	@JsonProperty("per100_uom_10_case")
	private String per100Uom10Case;
	@JsonProperty("per100_uom_11_case")
	private String per100Uom11Case;
	@JsonProperty("per100_uom_12_case")
	private String per100Uom12Case;
	@JsonProperty("per100_uom_13_case")
	private String per100Uom13Case;
	@JsonProperty("per100_uom_14_case")
	private String per100Uom14Case;

	/**
	 * @param matnr
	 * @param zznipInitStat
	 * @param zzEffectiveDate
	 * @param zzApprovalStat
	 * @param zzHazardGoods
	 * @param zzHazUnitCode
	 * @param zzHazUnitVol
	 * @param zzHazardClass
	 * @param zzHazSubsidCde
	 * @param zzHazPackGroup
	 * @param zzOdourInd
	 * @param zzEthyleneInd
	 * @param zzTrayId
	 * @param zzSoakerQty
	 * @param zzWrapsQty
	 * @param zzLabelFormId
	 * @param zzLabelDesc1
	 * @param zzLabelDesc2
	 * @param zzPrntPackDat
	 * @param zzPrntPackTim
	 * @param zzPiUom
	 * @param zzTareCode
	 * @param zzScaleArticle
	 * @param zzMandWarning
	 * @param zzNutritionClm
	 * @param zzStrgReqmnt
	 * @param zzCountryOrign
	 * @param zzSrvPerPack
	 * @param zzSrvSize
	 * @param zzSrvSizeUom
	 * @param wrapTare
	 * @param zzNutrient01
	 * @param zzServeQty01
	 * @param zzServeUom01
	 * @param zzPer100Qty01
	 * @param zzPer100Uom01
	 * @param zzNutrient02
	 * @param zzServeQty02
	 * @param zzServeUom02
	 * @param zzPer100Qty02
	 * @param zzPer100Uom02
	 * @param zzNutrient03
	 * @param zzServeQty03
	 * @param zzServeUom03
	 * @param zzPer100Qty03
	 * @param zzPer100Uom03
	 * @param zzNutrient04
	 * @param zzServeQty04
	 * @param zzServeUom04
	 * @param zzPer100Qty04
	 * @param zzPer100Uom04
	 * @param zzNutrient05
	 * @param zzServeQty05
	 * @param zzServeUom05
	 * @param zzPer100Qty05
	 * @param zzPer100Uom05
	 * @param zzNutrient06
	 * @param zzServeQty06
	 * @param zzServeUom06
	 * @param zzPer100Qty06
	 * @param zzPer100Uom06
	 * @param zzNutrient07
	 * @param zzServeQty07
	 * @param zzServeUom07
	 * @param zzPer100Qty07
	 * @param zzPer100Uom07
	 * @param zzNutrient08
	 * @param zzServeQty08
	 * @param zzServeUom08
	 * @param zzPer100Qty08
	 * @param zzPer100Uom08
	 * @param zzNutrient09
	 * @param zzServeQty09
	 * @param zzServeUom09
	 * @param zzPer100Qty09
	 * @param zzPer100Uom09
	 * @param zzNutrient10
	 * @param zzServeQty10
	 * @param zzServeUom10
	 * @param zzPer100Qty10
	 * @param zzPer100Uom10
	 * @param zzNutrient11
	 * @param zzServeQty11
	 * @param zzServeUom11
	 * @param zzPer100Qty11
	 * @param zzPer100Uom11
	 * @param zzNutrient12
	 * @param zzServeQty12
	 * @param zzServeUom12
	 * @param zzPer100Qty12
	 * @param zzPer100Uom12
	 * @param zzNutrient13
	 * @param zzServeQty13
	 * @param zzServeUom13
	 * @param zzPer100Qty13
	 * @param zzPer100Uom13
	 * @param zzNutrient14
	 * @param zzServeQty14
	 * @param zzServeUom14
	 * @param zzPer100Qty14
	 * @param zzPer100Uom14
	 * @param zzProdIngrd01
	 * @param zzProdIngrd02
	 * @param zzProdIngrd03
	 * @param zzProdIngrd04
	 * @param zzProdIngrd05
	 * @param zzProdIngrd06
	 * @param zzProdIngrd07
	 * @param zzProdIngrd08
	 * @param zzProdIngrd09
	 * @param zzProdIngrd10
	 * @param zzProdIngrd11
	 * @param zzProdIngrd12
	 * @param zzProdIngrd13
	 * @param zzProdIngrd14
	 * @param zzProdIngrd15
	 * @param zzProdIngrd16
	 * @param zzProdIngrd17
	 * @param zzProdIngrd18
	 * @param zzChksumFfmsg
	 * @param zzChksumFfnip
	 * @param zzChksumFfnote
	 * @param zzChksumFrfood
	 */
	public ArticleNutritionalResult(){
		
	}
	@JsonCreator
	public ArticleNutritionalResult(@JsonProperty("matnr") String matnr,
			@JsonProperty("zznip_init_stat") String zznipInitStat,
			@JsonProperty("zzeffective_date") String zzEffectiveDate,
			@JsonProperty("zzapproval_stat") String zzApprovalStat,
			@JsonProperty("zzhazard_goods") String zzHazardGoods,
			@JsonProperty("zzhaz_unit_code") String zzHazUnitCode,
			@JsonProperty("zzhaz_unit_vol") String zzHazUnitVol,
			@JsonProperty("zzhazard_class") String zzHazardClass,
			@JsonProperty("zzhaz_subsid_cde") String zzHazSubsidCde,
			@JsonProperty("zzhaz_pack_group") String zzHazPackGroup,
			@JsonProperty("zzodour_ind") String zzOdourInd,
			@JsonProperty("zzethylene_ind") String zzEthyleneInd,
			@JsonProperty("zztray_id") String zzTrayId,
			@JsonProperty("zzsoaker_qty") String zzSoakerQty,
			@JsonProperty("zzwraps_qty") String zzWrapsQty,
			@JsonProperty("zzlabel_form_id") String zzLabelFormId,
			@JsonProperty("zzlabel_desc_1") String zzLabelDesc1,
			@JsonProperty("zzlabel_desc_2") String zzLabelDesc2,
			@JsonProperty("zzprnt_pack_dat") String zzPrntPackDat,
			@JsonProperty("zzprnt_pack_tim") String zzPrntPackTim,
			@JsonProperty("pi_uom_case") String piUomCase,
			@JsonProperty("zztare_code") String zzTareCode,
			@JsonProperty("zzscale_article") String zzScaleArticle,
			@JsonProperty("zzmand_warning") String zzMandWarning,
			@JsonProperty("zznutrition_clm") String zzNutritionClm,
			@JsonProperty("zzstrg_reqmnt") String zzStrgReqmnt,
			@JsonProperty("zzcountry_orign") String zzCountryOrign,
			@JsonProperty("zzsrv_per_pack") String zzSrvPerPack,
			@JsonProperty("zzsrv_size") String zzSrvSize,
			@JsonProperty("srv_size_uom_case") String srvSizeUomCase,
			@JsonProperty("zzwrap_tare") String wrapTare,
			@JsonProperty("zznutrient_01") String zzNutrient01,
			@JsonProperty("zzserve_qty_01") String zzServeQty01,
			@JsonProperty("serve_uom_01_case") String serveUom01Case,
			@JsonProperty("zzper100_qty_01") String zzPer100Qty01,
			@JsonProperty("per100_uom_01_case") String per100Uom01Case,
			@JsonProperty("zznutrient_02") String zzNutrient02,
			@JsonProperty("zzserve_qty_02") String zzServeQty02,
			@JsonProperty("serve_uom_02_case") String serveUom02Case,
			@JsonProperty("zzper100_qty_02") String zzPer100Qty02,
			@JsonProperty("per100_uom_02_case") String per100Uom02Case,
			@JsonProperty("zznutrient_03") String zzNutrient03,
			@JsonProperty("zzserve_qty_03") String zzServeQty03,
			@JsonProperty("serve_uom_03_case") String serveUom03Case,
			@JsonProperty("zzper100_qty_03") String zzPer100Qty03,
			@JsonProperty("per100_uom_03_case") String per100Uom03Case,
			@JsonProperty("zznutrient_04") String zzNutrient04,
			@JsonProperty("zzserve_qty_04") String zzServeQty04,
			@JsonProperty("serve_uom_04_case") String serveUom04Case,
			@JsonProperty("zzper100_qty_04") String zzPer100Qty04,
			@JsonProperty("per100_uom_04_case") String per100Uom04Case,
			@JsonProperty("zznutrient_05") String zzNutrient05,
			@JsonProperty("zzserve_qty_05") String zzServeQty05,
			@JsonProperty("serve_uom_05_case") String serveUom05Case,
			@JsonProperty("zzper100_qty_05") String zzPer100Qty05,
			@JsonProperty("per100_uom_05_case") String per100Uom05Case,
			@JsonProperty("zznutrient_06") String zzNutrient06,
			@JsonProperty("zzserve_qty_06") String zzServeQty06,
			@JsonProperty("serve_uom_06_case") String serveUom06Case,
			@JsonProperty("zzper100_qty_06") String zzPer100Qty06,
			@JsonProperty("per100_uom_06_case") String per100Uom06Case,
			@JsonProperty("zznutrient_07") String zzNutrient07,
			@JsonProperty("zzserve_qty_07") String zzServeQty07,
			@JsonProperty("serve_uom_07_case") String serveUom07Case,
			@JsonProperty("zzper100_qty_07") String zzPer100Qty07,
			@JsonProperty("per100_uom_07_case") String per100Uom07Case,
			@JsonProperty("zznutrient_08") String zzNutrient08,
			@JsonProperty("zzserve_qty_08") String zzServeQty08,
			@JsonProperty("serve_uom_08_case") String serveUom08Case,
			@JsonProperty("zzper100_qty_08") String zzPer100Qty08,
			@JsonProperty("per100_uom_08_case") String per100Uom08Case,
			@JsonProperty("zznutrient_09") String zzNutrient09,
			@JsonProperty("zzserve_qty_09") String zzServeQty09,
			@JsonProperty("serve_uom_09_case") String serveUom09Case,
			@JsonProperty("zzper100_qty_09") String zzPer100Qty09,
			@JsonProperty("per100_uom_09_case") String per100Uom09Case,
			@JsonProperty("zznutrient_10") String zzNutrient10,
			@JsonProperty("zzserve_qty_10") String zzServeQty10,
			@JsonProperty("serve_uom_10_case") String serveUom10Case,
			@JsonProperty("zzper100_qty_10") String zzPer100Qty10,
			@JsonProperty("per100_uom_10_case") String per100Uom10Case,
			@JsonProperty("zznutrient_11") String zzNutrient11,
			@JsonProperty("zzserve_qty_11") String zzServeQty11,
			@JsonProperty("serve_uom_11_case") String serveUom11Case,
			@JsonProperty("zzper100_qty_11") String zzPer100Qty11,
			@JsonProperty("per100_uom_11_case") String per100Uom11Case,
			@JsonProperty("zznutrient_12") String zzNutrient12,
			@JsonProperty("zzserve_qty_12") String zzServeQty12,
			@JsonProperty("serve_uom_12_case") String serveUom12Case,
			@JsonProperty("zzper100_qty_12") String zzPer100Qty12,
			@JsonProperty("per100_uom_12_case") String per100Uom12Case,
			@JsonProperty("zznutrient_13") String zzNutrient13,
			@JsonProperty("zzserve_qty_13") String zzServeQty13,
			@JsonProperty("serve_uom_13_case") String serveUom13Case,
			@JsonProperty("zzper100_qty_13") String zzPer100Qty13,
			@JsonProperty("per100_uom_13_case") String per100Uom13Case,
			@JsonProperty("zznutrient_14") String zzNutrient14,
			@JsonProperty("zzserve_qty_14") String zzServeQty14,
			@JsonProperty("serve_uom_14_case") String serveUom14Case,
			@JsonProperty("zzper100_qty_14") String zzPer100Qty14,
			@JsonProperty("per100_uom_14_case") String per100Uom14Case,
			@JsonProperty("zzprod_ingrd_01") String zzProdIngrd01,
			@JsonProperty("zzprod_ingrd_02") String zzProdIngrd02,
			@JsonProperty("zzprod_ingrd_03") String zzProdIngrd03,
			@JsonProperty("zzprod_ingrd_04") String zzProdIngrd04,
			@JsonProperty("zzprod_ingrd_05") String zzProdIngrd05,
			@JsonProperty("zzprod_ingrd_06") String zzProdIngrd06,
			@JsonProperty("zzprod_ingrd_07") String zzProdIngrd07,
			@JsonProperty("zzprod_ingrd_08") String zzProdIngrd08,
			@JsonProperty("zzprod_ingrd_09") String zzProdIngrd09,
			@JsonProperty("zzprod_ingrd_10") String zzProdIngrd10,
			@JsonProperty("zzprod_ingrd_11") String zzProdIngrd11,
			@JsonProperty("zzprod_ingrd_12") String zzProdIngrd12,
			@JsonProperty("zzprod_ingrd_13") String zzProdIngrd13,
			@JsonProperty("zzprod_ingrd_14") String zzProdIngrd14,
			@JsonProperty("zzprod_ingrd_15") String zzProdIngrd15,
			@JsonProperty("zzprod_ingrd_16") String zzProdIngrd16,
			@JsonProperty("zzprod_ingrd_17") String zzProdIngrd17,
			@JsonProperty("zzprod_ingrd_18") String zzProdIngrd18,
			@JsonProperty("zzchksum_ffmsg") String zzChksumFfmsg,
			@JsonProperty("zzchksum_ffnip") String zzChksumFfnip,
			@JsonProperty("zzchksum_ffnote") String zzChksumFfnote,
			@JsonProperty("zzchksum_frfood") String zzChksumFrfood) {
		super();
		this.matnr = matnr;
		if(zznipInitStat != null && !zznipInitStat.equalsIgnoreCase("") && zznipInitStat.equalsIgnoreCase("X"))
			zznipInitStat = "Y"; //Defect_14761
		this.zznipInitStat = zznipInitStat;
		this.zzEffectiveDate = zzEffectiveDate;
		this.zzApprovalStat = zzApprovalStat;
		this.zzHazardGoods = zzHazardGoods;
		this.zzHazUnitCode = zzHazUnitCode;
		this.zzHazUnitVol = zzHazUnitVol;
		this.zzHazardClass = zzHazardClass;
		this.zzHazSubsidCde = zzHazSubsidCde;
		this.zzHazPackGroup = zzHazPackGroup;
		this.zzOdourInd = zzOdourInd;
		this.zzEthyleneInd = zzEthyleneInd;
		this.zzTrayId = zzTrayId;
		this.zzSoakerQty = zzSoakerQty;
		this.zzWrapsQty = zzWrapsQty;
		this.zzLabelFormId = zzLabelFormId;
		this.zzLabelDesc1 = zzLabelDesc1;
		this.zzLabelDesc2 = zzLabelDesc2;
		this.zzPrntPackDat = zzPrntPackDat;
		this.zzPrntPackTim = zzPrntPackTim;
		this.zzPiUom = piUomCase;
		this.piUomCase=piUomCase;
		this.zzTareCode = zzTareCode;
		if(zzScaleArticle != null && !zzScaleArticle.equalsIgnoreCase("") && zzScaleArticle.equalsIgnoreCase("X"))
			zzScaleArticle = "Y";//Defect_14761
		this.zzScaleArticle = zzScaleArticle;
		this.zzMandWarning = zzMandWarning;
		this.zzNutritionClm = zzNutritionClm;
		this.zzStrgReqmnt = zzStrgReqmnt;
		this.zzCountryOrign = zzCountryOrign;
		this.zzSrvPerPack = zzSrvPerPack;
		this.zzSrvSize = zzSrvSize;
		this.zzSrvSizeUom = srvSizeUomCase;
		this.srvSizeUomCase=srvSizeUomCase;
		this.wrapTare = wrapTare;
		this.zzNutrient01 = zzNutrient01;
		this.zzServeQty01 = zzServeQty01;
		this.zzServeUom01 = serveUom01Case;
		this.serveUom01Case=serveUom01Case;
		this.zzPer100Qty01 = zzPer100Qty01;
		this.zzPer100Uom01 = per100Uom01Case;
		this.per100Uom01Case=per100Uom01Case;
		this.zzNutrient02 = zzNutrient02;
		this.zzServeQty02 = zzServeQty02;
		this.zzServeUom02 = serveUom02Case;
		this.serveUom02Case=serveUom02Case;
		this.zzPer100Qty02 = zzPer100Qty02;
		this.zzPer100Uom02 = per100Uom02Case;
		this.per100Uom02Case=per100Uom02Case;
		this.zzNutrient03 = zzNutrient03;
		this.zzServeQty03 = zzServeQty03;
		this.zzServeUom03 = serveUom03Case;
		this.serveUom03Case=serveUom03Case;
		this.zzPer100Qty03 = zzPer100Qty03;
		this.zzPer100Uom03 = per100Uom03Case;
		this.per100Uom03Case=per100Uom03Case;
		this.zzNutrient04 = zzNutrient04;
		this.zzServeQty04 = zzServeQty04;
		this.zzServeUom04 = serveUom04Case;
		this.serveUom04Case=serveUom04Case;
		this.zzPer100Qty04 = zzPer100Qty04;
		this.zzPer100Uom04 = per100Uom04Case;
		this.per100Uom04Case=per100Uom04Case;
		this.zzNutrient05 = zzNutrient05;
		this.zzServeQty05 = zzServeQty05;
		this.zzServeUom05 = serveUom05Case;
		this.serveUom05Case=serveUom05Case;
		this.zzPer100Qty05 = zzPer100Qty05;
		this.zzPer100Uom05 = per100Uom05Case;
		this.per100Uom05Case=per100Uom05Case;
		this.zzNutrient06 = zzNutrient06;
		this.zzServeQty06 = zzServeQty06;
		this.zzServeUom06 = serveUom06Case;
		this.serveUom06Case=serveUom06Case;
		this.zzPer100Qty06 = zzPer100Qty06;
		this.zzPer100Uom06 = per100Uom06Case;
		this.per100Uom06Case=per100Uom06Case;
		this.zzNutrient07 = zzNutrient07;
		this.zzServeQty07 = zzServeQty07;
		this.zzServeUom07 = serveUom07Case;
		this.serveUom07Case=serveUom07Case;
		this.zzPer100Qty07 = zzPer100Qty07;
		this.zzPer100Uom07 = per100Uom07Case;
		this.per100Uom07Case=per100Uom07Case;
		this.zzNutrient08 = zzNutrient08;
		this.zzServeQty08 = zzServeQty08;
		this.zzServeUom08 = serveUom08Case;
		this.serveUom08Case=serveUom08Case;
		this.zzPer100Qty08 = zzPer100Qty08;
		this.zzPer100Uom08 = per100Uom08Case;
		this.per100Uom08Case=per100Uom08Case;
		this.zzNutrient09 = zzNutrient09;
		this.zzServeQty09 = zzServeQty09;
		this.zzServeUom09 = serveUom09Case;
		this.serveUom09Case=serveUom09Case;
		this.zzPer100Qty09 = zzPer100Qty09;
		this.zzPer100Uom09 = per100Uom09Case;
		this.per100Uom09Case=per100Uom09Case;
		this.zzNutrient10 = zzNutrient10;
		this.zzServeQty10 = zzServeQty10;
		this.zzServeUom10 = serveUom10Case;
		this.serveUom10Case=serveUom10Case;
		this.zzPer100Qty10 = zzPer100Qty10;
		this.zzPer100Uom10 = per100Uom10Case;
		this.per100Uom10Case=per100Uom10Case;
		this.zzNutrient11 = zzNutrient11;
		this.zzServeQty11 = zzServeQty11;
		this.zzServeUom11 = serveUom11Case;
		this.serveUom11Case=serveUom11Case;
		this.zzPer100Qty11 = zzPer100Qty11;
		this.zzPer100Uom11 = per100Uom11Case;
		this.per100Uom11Case=per100Uom11Case;
		this.zzNutrient12 = zzNutrient12;
		this.zzServeQty12 = zzServeQty12;
		this.zzServeUom12 = serveUom12Case;
		this.serveUom12Case=serveUom12Case;
		this.zzPer100Qty12 = zzPer100Qty12;
		this.zzPer100Uom12 = per100Uom12Case;
		this.per100Uom12Case=per100Uom12Case;
		this.zzNutrient13 = zzNutrient13;
		this.zzServeQty13 = zzServeQty13;
		this.zzServeUom13 = serveUom13Case;
		this.serveUom13Case=serveUom13Case;
		this.zzPer100Qty13 = zzPer100Qty13;
		this.zzPer100Uom13 = per100Uom13Case;
		this.per100Uom13Case=per100Uom13Case;
		this.zzNutrient14 = zzNutrient14;
		this.zzServeQty14 = zzServeQty14;
		this.zzServeUom14 = serveUom14Case;
		this.serveUom14Case=serveUom14Case;
		this.zzPer100Qty14 = zzPer100Qty14;
		this.zzPer100Uom14 = per100Uom14Case;
		this.per100Uom14Case=per100Uom14Case;
		this.zzProdIngrd01 = zzProdIngrd01;
		this.zzProdIngrd02 = zzProdIngrd02;
		this.zzProdIngrd03 = zzProdIngrd03;
		this.zzProdIngrd04 = zzProdIngrd04;
		this.zzProdIngrd05 = zzProdIngrd05;
		this.zzProdIngrd06 = zzProdIngrd06;
		this.zzProdIngrd07 = zzProdIngrd07;
		this.zzProdIngrd08 = zzProdIngrd08;
		this.zzProdIngrd09 = zzProdIngrd09;
		this.zzProdIngrd10 = zzProdIngrd10;
		this.zzProdIngrd11 = zzProdIngrd11;
		this.zzProdIngrd12 = zzProdIngrd12;
		this.zzProdIngrd13 = zzProdIngrd13;
		this.zzProdIngrd14 = zzProdIngrd14;
		this.zzProdIngrd15 = zzProdIngrd15;
		this.zzProdIngrd16 = zzProdIngrd16;
		this.zzProdIngrd17 = zzProdIngrd17;
		this.zzProdIngrd18 = zzProdIngrd18;
		this.zzChksumFfmsg = zzChksumFfmsg;
		this.zzChksumFfnip = zzChksumFfnip;
		this.zzChksumFfnote = zzChksumFfnote;
		this.zzChksumFrfood = zzChksumFrfood;

		this.matnr_m = matnr;
		this.zznipInitStat_m = zznipInitStat;
		this.zzEffectiveDate_m = zzEffectiveDate;
		this.zzApprovalStat_m = zzApprovalStat;
		this.zzHazardGoods_m = zzHazardGoods;
		this.zzHazUnitCode_m = zzHazUnitCode;
		this.zzHazUnitVol_m = zzHazUnitVol;
		this.zzHazardClass_m = zzHazardClass;
		this.zzHazSubsidCde_m = zzHazSubsidCde;
		this.zzHazPackGroup_m = zzHazPackGroup;
		this.zzOdourInd_m = zzOdourInd;
		this.zzEthyleneInd_m = zzEthyleneInd;
		this.zzTrayId_m = zzTrayId;
		this.zzSoakerQty_m = zzSoakerQty;
		this.zzWrapsQty_m = zzWrapsQty;
		this.zzLabelFormId_m = zzLabelFormId;
		this.zzLabelDesc1_m = zzLabelDesc1;
		this.zzLabelDesc2_m = zzLabelDesc2;
		this.zzPrntPackDat_m = zzPrntPackDat;
		this.zzPrntPackTim_m = zzPrntPackTim;
		this.zzPiUom_m = zzPiUom;
		this.zzTareCode_m = zzTareCode;
		this.zzScaleArticle_m = zzScaleArticle;
		this.zzMandWarning_m = zzMandWarning;
		this.zzNutritionClm_m = zzNutritionClm;
		this.zzStrgReqmnt_m = zzStrgReqmnt;
		this.zzCountryOrign_m = zzCountryOrign;
		this.zzSrvPerPack_m = zzSrvPerPack;
		this.zzSrvSize_m = zzSrvSize;
		this.zzSrvSizeUom_m = zzSrvSizeUom;
		this.wrapTare_m = wrapTare;
		this.zzNutrient01_m = zzNutrient01;
		this.zzServeQty01_m = zzServeQty01;
		this.zzServeUom01_m = serveUom01Case;
		this.zzPer100Qty01_m = zzPer100Qty01;
		this.zzPer100Uom01_m = per100Uom01Case;
		this.zzNutrient02_m = zzNutrient02;
		this.zzServeQty02_m = zzServeQty02;
		this.zzServeUom02_m = serveUom02Case;
		this.zzPer100Qty02_m = zzPer100Qty02;
		this.zzPer100Uom02_m = per100Uom02Case;
		this.zzNutrient03_m = zzNutrient03;
		this.zzServeQty03_m = zzServeQty03;
		this.zzServeUom03_m = serveUom03Case;
		this.zzPer100Qty03_m = zzPer100Qty03;
		this.zzPer100Uom03_m = per100Uom03Case;
		this.zzNutrient04_m = zzNutrient04;
		this.zzServeQty04_m = zzServeQty04;
		this.zzServeUom04_m = serveUom04Case;
		this.zzPer100Qty04_m = zzPer100Qty04;
		this.zzPer100Uom04_m = per100Uom04Case;
		this.zzNutrient05_m = zzNutrient05;
		this.zzServeQty05_m = zzServeQty05;
		this.zzServeUom05_m = serveUom05Case;
		this.zzPer100Qty05_m = zzPer100Qty05;
		this.zzPer100Uom05_m = per100Uom05Case;
		this.zzNutrient06_m = zzNutrient06;
		this.zzServeQty06_m = zzServeQty06;
		this.zzServeUom06_m = serveUom06Case;
		this.zzPer100Qty06_m = zzPer100Qty06;
		this.zzPer100Uom06_m = per100Uom06Case;
		this.zzNutrient07_m = zzNutrient07;
		this.zzServeQty07_m = zzServeQty07;
		this.zzServeUom07_m = serveUom07Case;
		this.zzPer100Qty07_m = zzPer100Qty07;
		this.zzPer100Uom07_m = per100Uom07Case;
		this.zzNutrient08_m = zzNutrient08;
		this.zzServeQty08_m = zzServeQty08;
		this.zzServeUom08_m = serveUom08Case;
		this.zzPer100Qty08_m = zzPer100Qty08;
		this.zzPer100Uom08_m = per100Uom08Case;
		this.zzNutrient09_m = zzNutrient09;
		this.zzServeQty09_m = zzServeQty09;
		this.zzServeUom09_m = serveUom09Case;
		this.zzPer100Qty09_m = zzPer100Qty09;
		this.zzPer100Uom09_m = per100Uom09Case;
		this.zzNutrient10_m = zzNutrient10;
		this.zzServeQty10_m = zzServeQty10;
		this.zzServeUom10_m = serveUom10Case;
		this.zzPer100Qty10_m = zzPer100Qty10;
		this.zzPer100Uom10_m = per100Uom10Case;
		this.zzNutrient11_m = zzNutrient11;
		this.zzServeQty11_m = zzServeQty11;
		this.zzServeUom11_m = serveUom11Case;
		this.zzPer100Qty11_m = zzPer100Qty11;
		this.zzPer100Uom11_m = per100Uom11Case;
		this.zzNutrient12_m = zzNutrient12;
		this.zzServeQty12_m = zzServeQty12;
		this.zzServeUom12_m = serveUom12Case;
		this.zzPer100Qty12_m = zzPer100Qty12;
		this.zzPer100Uom12_m = per100Uom12Case;
		this.zzNutrient13_m = zzNutrient13;
		this.zzServeQty13_m = zzServeQty13;
		this.zzServeUom13_m = serveUom13Case;
		this.zzPer100Qty13_m = zzPer100Qty13;
		this.zzPer100Uom13_m = per100Uom13Case;
		this.zzNutrient14_m = zzNutrient14;
		this.zzServeQty14_m = zzServeQty14;
		this.zzServeUom14_m = serveUom14Case;
		this.zzPer100Qty14_m = zzPer100Qty14;
		this.zzPer100Uom14_m = per100Uom14Case;
		this.zzProdIngrd01_m = zzProdIngrd01;
		this.zzProdIngrd02_m = zzProdIngrd02;
		this.zzProdIngrd03_m = zzProdIngrd03;
		this.zzProdIngrd04_m = zzProdIngrd04;
		this.zzProdIngrd05_m = zzProdIngrd05;
		this.zzProdIngrd06_m = zzProdIngrd06;
		this.zzProdIngrd07_m = zzProdIngrd07;
		this.zzProdIngrd08_m = zzProdIngrd08;
		this.zzProdIngrd09_m = zzProdIngrd09;
		this.zzProdIngrd10_m = zzProdIngrd10;
		this.zzProdIngrd11_m = zzProdIngrd11;
		this.zzProdIngrd12_m = zzProdIngrd12;
		this.zzProdIngrd13_m = zzProdIngrd13;
		this.zzProdIngrd14_m = zzProdIngrd14;
		this.zzProdIngrd15_m = zzProdIngrd15;
		this.zzProdIngrd16_m = zzProdIngrd16;
		this.zzProdIngrd17_m = zzProdIngrd17;
		this.zzProdIngrd18_m = zzProdIngrd18;
		this.zzChksumFfmsg_m = zzChksumFfmsg;
		this.zzChksumFfnip_m = zzChksumFfnip;
		this.zzChksumFfnote_m = zzChksumFfnote;
		this.zzChksumFrfood_m = zzChksumFrfood;
	}

	/**
	 * @return the matnr
	 */
	public String getMatnr() {
		return matnr;
	}

	/**
	 * @param matnr the matnr to set
	 */
	public void setMatnr(String matnr) {
		this.matnr = matnr;
	}

	/**
	 * @return the zznipInitStat
	 */
	public String getZznipInitStat() {
		return zznipInitStat;
	}

	/**
	 * @param zznipInitStat the zznipInitStat to set
	 */
	public void setZznipInitStat(String zznipInitStat) {
		this.zznipInitStat = zznipInitStat;
	}

	/**
	 * @return the zzEffectiveDate
	 */
	public String getZzEffectiveDate() {
		return zzEffectiveDate;
	}

	/**
	 * @param zzEffectiveDate the zzEffectiveDate to set
	 */
	public void setZzEffectiveDate(String zzEffectiveDate) {
		this.zzEffectiveDate = zzEffectiveDate;
	}

	/**
	 * @return the zzApprovalStat
	 */
	public String getZzApprovalStat() {
		return zzApprovalStat;
	}

	/**
	 * @param zzApprovalStat the zzApprovalStat to set
	 */
	public void setZzApprovalStat(String zzApprovalStat) {
		this.zzApprovalStat = zzApprovalStat;
	}

	/**
	 * @return the zzHazardGoods
	 */
	public String getZzHazardGoods() {
		return zzHazardGoods;
	}

	/**
	 * @param zzHazardGoods the zzHazardGoods to set
	 */
	public void setZzHazardGoods(String zzHazardGoods) {
		this.zzHazardGoods = zzHazardGoods;
	}

	/**
	 * @return the zzHazUnitCode
	 */
	public String getZzHazUnitCode() {
		return zzHazUnitCode;
	}

	/**
	 * @param zzHazUnitCode the zzHazUnitCode to set
	 */
	public void setZzHazUnitCode(String zzHazUnitCode) {
		this.zzHazUnitCode = zzHazUnitCode;
	}

	/**
	 * @return the zzHazUnitVol
	 */
	public String getZzHazUnitVol() {
		return zzHazUnitVol;
	}

	/**
	 * @param zzHazUnitVol the zzHazUnitVol to set
	 */
	public void setZzHazUnitVol(String zzHazUnitVol) {
		this.zzHazUnitVol = zzHazUnitVol;
	}

	/**
	 * @return the zzHazardClass
	 */
	public String getZzHazardClass() {
		return zzHazardClass;
	}

	/**
	 * @param zzHazardClass the zzHazardClass to set
	 */
	public void setZzHazardClass(String zzHazardClass) {
		this.zzHazardClass = zzHazardClass;
	}

	/**
	 * @return the zzHazSubsidCde
	 */
	public String getZzHazSubsidCde() {
		return zzHazSubsidCde;
	}

	/**
	 * @param zzHazSubsidCde the zzHazSubsidCde to set
	 */
	public void setZzHazSubsidCde(String zzHazSubsidCde) {
		this.zzHazSubsidCde = zzHazSubsidCde;
	}

	/**
	 * @return the zzHazPackGroup
	 */
	public String getZzHazPackGroup() {
		return zzHazPackGroup;
	}

	/**
	 * @param zzHazPackGroup the zzHazPackGroup to set
	 */
	public void setZzHazPackGroup(String zzHazPackGroup) {
		this.zzHazPackGroup = zzHazPackGroup;
	}

	/**
	 * @return the zzOdourInd
	 */
	public String getZzOdourInd() {
		return zzOdourInd;
	}

	/**
	 * @param zzOdourInd the zzOdourInd to set
	 */
	public void setZzOdourInd(String zzOdourInd) {
		this.zzOdourInd = zzOdourInd;
	}

	/**
	 * @return the zzEthyleneInd
	 */
	public String getZzEthyleneInd() {
		return zzEthyleneInd;
	}

	/**
	 * @param zzEthyleneInd the zzEthyleneInd to set
	 */
	public void setZzEthyleneInd(String zzEthyleneInd) {
		this.zzEthyleneInd = zzEthyleneInd;
	}

	/**
	 * @return the zzTrayId
	 */
	public String getZzTrayId() {
		return zzTrayId;
	}

	/**
	 * @param zzTrayId the zzTrayId to set
	 */
	public void setZzTrayId(String zzTrayId) {
		this.zzTrayId = zzTrayId;
	}

	/**
	 * @return the zzSoakerQty
	 */
	public String getZzSoakerQty() {
		return zzSoakerQty;
	}

	/**
	 * @param zzSoakerQty the zzSoakerQty to set
	 */
	public void setZzSoakerQty(String zzSoakerQty) {
		this.zzSoakerQty = zzSoakerQty;
	}

	/**
	 * @return the zzWrapsQty
	 */
	public String getZzWrapsQty() {
		return zzWrapsQty;
	}

	/**
	 * @param zzWrapsQty the zzWrapsQty to set
	 */
	public void setZzWrapsQty(String zzWrapsQty) {
		this.zzWrapsQty = zzWrapsQty;
	}

	/**
	 * @return the zzLabelFormId
	 */
	public String getZzLabelFormId() {
		return zzLabelFormId;
	}

	/**
	 * @param zzLabelFormId the zzLabelFormId to set
	 */
	public void setZzLabelFormId(String zzLabelFormId) {
		this.zzLabelFormId = zzLabelFormId;
	}

	/**
	 * @return the zzLabelDesc1
	 */
	public String getZzLabelDesc1() {
		return zzLabelDesc1;
	}

	/**
	 * @param zzLabelDesc1 the zzLabelDesc1 to set
	 */
	public void setZzLabelDesc1(String zzLabelDesc1) {
		this.zzLabelDesc1 = zzLabelDesc1;
	}

	/**
	 * @return the zzLabelDesc2
	 */
	public String getZzLabelDesc2() {
		return zzLabelDesc2;
	}

	/**
	 * @param zzLabelDesc2 the zzLabelDesc2 to set
	 */
	public void setZzLabelDesc2(String zzLabelDesc2) {
		this.zzLabelDesc2 = zzLabelDesc2;
	}

	/**
	 * @return the zzPrntPackDat
	 */
	public String getZzPrntPackDat() {
		return zzPrntPackDat;
	}

	/**
	 * @param zzPrntPackDat the zzPrntPackDat to set
	 */
	public void setZzPrntPackDat(String zzPrntPackDat) {
		this.zzPrntPackDat = zzPrntPackDat;
	}

	/**
	 * @return the zzPrntPackTim
	 */
	public String getZzPrntPackTim() {
		return zzPrntPackTim;
	}

	/**
	 * @param zzPrntPackTim the zzPrntPackTim to set
	 */
	public void setZzPrntPackTim(String zzPrntPackTim) {
		this.zzPrntPackTim = zzPrntPackTim;
	}

	/**
	 * @return the zzPiUom
	 */
	public String getZzPiUom() {
		return zzPiUom;
	}

	/**
	 * @param zzPiUom the zzPiUom to set
	 */
	public void setZzPiUom(String zzPiUom) {
		this.zzPiUom = zzPiUom;
	}

	/**
	 * @return the zzTareCode
	 */
	public String getZzTareCode() {
		return zzTareCode;
	}

	/**
	 * @param zzTareCode the zzTareCode to set
	 */
	public void setZzTareCode(String zzTareCode) {
		this.zzTareCode = zzTareCode;
	}

	/**
	 * @return the zzScaleArticle
	 */
	public String getZzScaleArticle() {
		return zzScaleArticle;
	}

	/**
	 * @param zzScaleArticle the zzScaleArticle to set
	 */
	public void setZzScaleArticle(String zzScaleArticle) {
		this.zzScaleArticle = zzScaleArticle;
	}

	/**
	 * @return the zzMandWarning
	 */
	public String getZzMandWarning() {
		return zzMandWarning;
	}

	/**
	 * @param zzMandWarning the zzMandWarning to set
	 */
	public void setZzMandWarning(String zzMandWarning) {
		this.zzMandWarning = zzMandWarning;
	}

	/**
	 * @return the zzNutritionClm
	 */
	public String getZzNutritionClm() {
		return zzNutritionClm;
	}

	/**
	 * @param zzNutritionClm the zzNutritionClm to set
	 */
	public void setZzNutritionClm(String zzNutritionClm) {
		this.zzNutritionClm = zzNutritionClm;
	}

	/**
	 * @return the zzStrgReqmnt
	 */
	public String getZzStrgReqmnt() {
		return zzStrgReqmnt;
	}

	/**
	 * @param zzStrgReqmnt the zzStrgReqmnt to set
	 */
	public void setZzStrgReqmnt(String zzStrgReqmnt) {
		this.zzStrgReqmnt = zzStrgReqmnt;
	}

	/**
	 * @return the zzCountryOrign
	 */
	public String getZzCountryOrign() {
		return zzCountryOrign;
	}

	/**
	 * @param zzCountryOrign the zzCountryOrign to set
	 */
	public void setZzCountryOrign(String zzCountryOrign) {
		this.zzCountryOrign = zzCountryOrign;
	}

	/**
	 * @return the zzSrvPerPack
	 */
	public String getZzSrvPerPack() {
		return zzSrvPerPack;
	}

	/**
	 * @param zzSrvPerPack the zzSrvPerPack to set
	 */
	public void setZzSrvPerPack(String zzSrvPerPack) {
		this.zzSrvPerPack = zzSrvPerPack;
	}

	/**
	 * @return the zzSrvSize
	 */
	public String getZzSrvSize() {
		return zzSrvSize;
	}

	/**
	 * @param zzSrvSize the zzSrvSize to set
	 */
	public void setZzSrvSize(String zzSrvSize) {
		this.zzSrvSize = zzSrvSize;
	}

	/**
	 * @return the zzSrvSizeUom
	 */
	public String getZzSrvSizeUom() {
		return zzSrvSizeUom;
	}

	/**
	 * @param zzSrvSizeUom the zzSrvSizeUom to set
	 */
	public void setZzSrvSizeUom(String zzSrvSizeUom) {
		this.zzSrvSizeUom = zzSrvSizeUom;
	}

	/**
	 * @return the wrapTare
	 */
	public String getWrapTare() {
		return wrapTare;
	}

	/**
	 * @param wrapTare the wrapTare to set
	 */
	public void setWrapTare(String wrapTare) {
		this.wrapTare = wrapTare;
	}

	/**
	 * @return the zzNutrient01
	 */
	public String getZzNutrient01() {
		return zzNutrient01;
	}

	/**
	 * @param zzNutrient01 the zzNutrient01 to set
	 */
	public void setZzNutrient01(String zzNutrient01) {
		this.zzNutrient01 = zzNutrient01;
	}

	/**
	 * @return the zzServeQty01
	 */
	public String getZzServeQty01() {
		return zzServeQty01;
	}

	/**
	 * @param zzServeQty01 the zzServeQty01 to set
	 */
	public void setZzServeQty01(String zzServeQty01) {
		this.zzServeQty01 = zzServeQty01;
	}

	/**
	 * @return the zzServeUom01
	 */
	public String getZzServeUom01() {
		return zzServeUom01;
	}

	/**
	 * @param zzServeUom01 the zzServeUom01 to set
	 */
	public void setZzServeUom01(String zzServeUom01) {
		this.zzServeUom01 = zzServeUom01;
	}

	/**
	 * @return the zzPer100Qty01
	 */
	public String getZzPer100Qty01() {
		return zzPer100Qty01;
	}

	/**
	 * @param zzPer100Qty01 the zzPer100Qty01 to set
	 */
	public void setZzPer100Qty01(String zzPer100Qty01) {
		this.zzPer100Qty01 = zzPer100Qty01;
	}

	/**
	 * @return the zzPer100Uom01
	 */
	public String getZzPer100Uom01() {
		return zzPer100Uom01;
	}

	/**
	 * @param zzPer100Uom01 the zzPer100Uom01 to set
	 */
	public void setZzPer100Uom01(String zzPer100Uom01) {
		this.zzPer100Uom01 = zzPer100Uom01;
	}

	/**
	 * @return the zzNutrient02
	 */
	public String getZzNutrient02() {
		return zzNutrient02;
	}

	/**
	 * @param zzNutrient02 the zzNutrient02 to set
	 */
	public void setZzNutrient02(String zzNutrient02) {
		this.zzNutrient02 = zzNutrient02;
	}

	/**
	 * @return the zzServeQty02
	 */
	public String getZzServeQty02() {
		return zzServeQty02;
	}

	/**
	 * @param zzServeQty02 the zzServeQty02 to set
	 */
	public void setZzServeQty02(String zzServeQty02) {
		this.zzServeQty02 = zzServeQty02;
	}

	/**
	 * @return the zzServeUom02
	 */
	public String getZzServeUom02() {
		return zzServeUom02;
	}

	/**
	 * @param zzServeUom02 the zzServeUom02 to set
	 */
	public void setZzServeUom02(String zzServeUom02) {
		this.zzServeUom02 = zzServeUom02;
	}

	/**
	 * @return the zzPer100Qty02
	 */
	public String getZzPer100Qty02() {
		return zzPer100Qty02;
	}

	/**
	 * @param zzPer100Qty02 the zzPer100Qty02 to set
	 */
	public void setZzPer100Qty02(String zzPer100Qty02) {
		this.zzPer100Qty02 = zzPer100Qty02;
	}

	/**
	 * @return the zzPer100Uom02
	 */
	public String getZzPer100Uom02() {
		return zzPer100Uom02;
	}

	/**
	 * @param zzPer100Uom02 the zzPer100Uom02 to set
	 */
	public void setZzPer100Uom02(String zzPer100Uom02) {
		this.zzPer100Uom02 = zzPer100Uom02;
	}

	/**
	 * @return the zzNutrient03
	 */
	public String getZzNutrient03() {
		return zzNutrient03;
	}

	/**
	 * @param zzNutrient03 the zzNutrient03 to set
	 */
	public void setZzNutrient03(String zzNutrient03) {
		this.zzNutrient03 = zzNutrient03;
	}

	/**
	 * @return the zzServeQty03
	 */
	public String getZzServeQty03() {
		return zzServeQty03;
	}

	/**
	 * @param zzServeQty03 the zzServeQty03 to set
	 */
	public void setZzServeQty03(String zzServeQty03) {
		this.zzServeQty03 = zzServeQty03;
	}

	/**
	 * @return the zzServeUom03
	 */
	public String getZzServeUom03() {
		return zzServeUom03;
	}

	/**
	 * @param zzServeUom03 the zzServeUom03 to set
	 */
	public void setZzServeUom03(String zzServeUom03) {
		this.zzServeUom03 = zzServeUom03;
	}

	/**
	 * @return the zzPer100Qty03
	 */
	public String getZzPer100Qty03() {
		return zzPer100Qty03;
	}

	/**
	 * @param zzPer100Qty03 the zzPer100Qty03 to set
	 */
	public void setZzPer100Qty03(String zzPer100Qty03) {
		this.zzPer100Qty03 = zzPer100Qty03;
	}

	/**
	 * @return the zzPer100Uom03
	 */
	public String getZzPer100Uom03() {
		return zzPer100Uom03;
	}

	/**
	 * @param zzPer100Uom03 the zzPer100Uom03 to set
	 */
	public void setZzPer100Uom03(String zzPer100Uom03) {
		this.zzPer100Uom03 = zzPer100Uom03;
	}

	/**
	 * @return the zzNutrient04
	 */
	public String getZzNutrient04() {
		return zzNutrient04;
	}

	/**
	 * @param zzNutrient04 the zzNutrient04 to set
	 */
	public void setZzNutrient04(String zzNutrient04) {
		this.zzNutrient04 = zzNutrient04;
	}

	/**
	 * @return the zzServeQty04
	 */
	public String getZzServeQty04() {
		return zzServeQty04;
	}

	/**
	 * @param zzServeQty04 the zzServeQty04 to set
	 */
	public void setZzServeQty04(String zzServeQty04) {
		this.zzServeQty04 = zzServeQty04;
	}

	/**
	 * @return the zzServeUom04
	 */
	public String getZzServeUom04() {
		return zzServeUom04;
	}

	/**
	 * @param zzServeUom04 the zzServeUom04 to set
	 */
	public void setZzServeUom04(String zzServeUom04) {
		this.zzServeUom04 = zzServeUom04;
	}

	/**
	 * @return the zzPer100Qty04
	 */
	public String getZzPer100Qty04() {
		return zzPer100Qty04;
	}

	/**
	 * @param zzPer100Qty04 the zzPer100Qty04 to set
	 */
	public void setZzPer100Qty04(String zzPer100Qty04) {
		this.zzPer100Qty04 = zzPer100Qty04;
	}

	/**
	 * @return the zzPer100Uom04
	 */
	public String getZzPer100Uom04() {
		return zzPer100Uom04;
	}

	/**
	 * @param zzPer100Uom04 the zzPer100Uom04 to set
	 */
	public void setZzPer100Uom04(String zzPer100Uom04) {
		this.zzPer100Uom04 = zzPer100Uom04;
	}

	/**
	 * @return the zzNutrient05
	 */
	public String getZzNutrient05() {
		return zzNutrient05;
	}

	/**
	 * @param zzNutrient05 the zzNutrient05 to set
	 */
	public void setZzNutrient05(String zzNutrient05) {
		this.zzNutrient05 = zzNutrient05;
	}

	/**
	 * @return the zzServeQty05
	 */
	public String getZzServeQty05() {
		return zzServeQty05;
	}

	/**
	 * @param zzServeQty05 the zzServeQty05 to set
	 */
	public void setZzServeQty05(String zzServeQty05) {
		this.zzServeQty05 = zzServeQty05;
	}

	/**
	 * @return the zzServeUom05
	 */
	public String getZzServeUom05() {
		return zzServeUom05;
	}

	/**
	 * @param zzServeUom05 the zzServeUom05 to set
	 */
	public void setZzServeUom05(String zzServeUom05) {
		this.zzServeUom05 = zzServeUom05;
	}

	/**
	 * @return the zzPer100Qty05
	 */
	public String getZzPer100Qty05() {
		return zzPer100Qty05;
	}

	/**
	 * @param zzPer100Qty05 the zzPer100Qty05 to set
	 */
	public void setZzPer100Qty05(String zzPer100Qty05) {
		this.zzPer100Qty05 = zzPer100Qty05;
	}

	/**
	 * @return the zzPer100Uom05
	 */
	public String getZzPer100Uom05() {
		return zzPer100Uom05;
	}

	/**
	 * @param zzPer100Uom05 the zzPer100Uom05 to set
	 */
	public void setZzPer100Uom05(String zzPer100Uom05) {
		this.zzPer100Uom05 = zzPer100Uom05;
	}

	/**
	 * @return the zzNutrient06
	 */
	public String getZzNutrient06() {
		return zzNutrient06;
	}

	/**
	 * @param zzNutrient06 the zzNutrient06 to set
	 */
	public void setZzNutrient06(String zzNutrient06) {
		this.zzNutrient06 = zzNutrient06;
	}

	/**
	 * @return the zzServeQty06
	 */
	public String getZzServeQty06() {
		return zzServeQty06;
	}

	/**
	 * @param zzServeQty06 the zzServeQty06 to set
	 */
	public void setZzServeQty06(String zzServeQty06) {
		this.zzServeQty06 = zzServeQty06;
	}

	/**
	 * @return the zzServeUom06
	 */
	public String getZzServeUom06() {
		return zzServeUom06;
	}

	/**
	 * @param zzServeUom06 the zzServeUom06 to set
	 */
	public void setZzServeUom06(String zzServeUom06) {
		this.zzServeUom06 = zzServeUom06;
	}

	/**
	 * @return the zzPer100Qty06
	 */
	public String getZzPer100Qty06() {
		return zzPer100Qty06;
	}

	/**
	 * @param zzPer100Qty06 the zzPer100Qty06 to set
	 */
	public void setZzPer100Qty06(String zzPer100Qty06) {
		this.zzPer100Qty06 = zzPer100Qty06;
	}

	/**
	 * @return the zzPer100Uom06
	 */
	public String getZzPer100Uom06() {
		return zzPer100Uom06;
	}

	/**
	 * @param zzPer100Uom06 the zzPer100Uom06 to set
	 */
	public void setZzPer100Uom06(String zzPer100Uom06) {
		this.zzPer100Uom06 = zzPer100Uom06;
	}

	/**
	 * @return the zzNutrient07
	 */
	public String getZzNutrient07() {
		return zzNutrient07;
	}

	/**
	 * @param zzNutrient07 the zzNutrient07 to set
	 */
	public void setZzNutrient07(String zzNutrient07) {
		this.zzNutrient07 = zzNutrient07;
	}

	/**
	 * @return the zzServeQty07
	 */
	public String getZzServeQty07() {
		return zzServeQty07;
	}

	/**
	 * @param zzServeQty07 the zzServeQty07 to set
	 */
	public void setZzServeQty07(String zzServeQty07) {
		this.zzServeQty07 = zzServeQty07;
	}

	/**
	 * @return the zzServeUom07
	 */
	public String getZzServeUom07() {
		return zzServeUom07;
	}

	/**
	 * @param zzServeUom07 the zzServeUom07 to set
	 */
	public void setZzServeUom07(String zzServeUom07) {
		this.zzServeUom07 = zzServeUom07;
	}

	/**
	 * @return the zzPer100Qty07
	 */
	public String getZzPer100Qty07() {
		return zzPer100Qty07;
	}

	/**
	 * @param zzPer100Qty07 the zzPer100Qty07 to set
	 */
	public void setZzPer100Qty07(String zzPer100Qty07) {
		this.zzPer100Qty07 = zzPer100Qty07;
	}

	/**
	 * @return the zzPer100Uom07
	 */
	public String getZzPer100Uom07() {
		return zzPer100Uom07;
	}

	/**
	 * @param zzPer100Uom07 the zzPer100Uom07 to set
	 */
	public void setZzPer100Uom07(String zzPer100Uom07) {
		this.zzPer100Uom07 = zzPer100Uom07;
	}

	/**
	 * @return the zzNutrient08
	 */
	public String getZzNutrient08() {
		return zzNutrient08;
	}

	/**
	 * @param zzNutrient08 the zzNutrient08 to set
	 */
	public void setZzNutrient08(String zzNutrient08) {
		this.zzNutrient08 = zzNutrient08;
	}

	/**
	 * @return the zzServeQty08
	 */
	public String getZzServeQty08() {
		return zzServeQty08;
	}

	/**
	 * @param zzServeQty08 the zzServeQty08 to set
	 */
	public void setZzServeQty08(String zzServeQty08) {
		this.zzServeQty08 = zzServeQty08;
	}

	/**
	 * @return the zzServeUom08
	 */
	public String getZzServeUom08() {
		return zzServeUom08;
	}

	/**
	 * @param zzServeUom08 the zzServeUom08 to set
	 */
	public void setZzServeUom08(String zzServeUom08) {
		this.zzServeUom08 = zzServeUom08;
	}

	/**
	 * @return the zzPer100Qty08
	 */
	public String getZzPer100Qty08() {
		return zzPer100Qty08;
	}

	/**
	 * @param zzPer100Qty08 the zzPer100Qty08 to set
	 */
	public void setZzPer100Qty08(String zzPer100Qty08) {
		this.zzPer100Qty08 = zzPer100Qty08;
	}

	/**
	 * @return the zzPer100Uom08
	 */
	public String getZzPer100Uom08() {
		return zzPer100Uom08;
	}

	/**
	 * @param zzPer100Uom08 the zzPer100Uom08 to set
	 */
	public void setZzPer100Uom08(String zzPer100Uom08) {
		this.zzPer100Uom08 = zzPer100Uom08;
	}

	/**
	 * @return the zzNutrient09
	 */
	public String getZzNutrient09() {
		return zzNutrient09;
	}

	/**
	 * @param zzNutrient09 the zzNutrient09 to set
	 */
	public void setZzNutrient09(String zzNutrient09) {
		this.zzNutrient09 = zzNutrient09;
	}

	/**
	 * @return the zzServeQty09
	 */
	public String getZzServeQty09() {
		return zzServeQty09;
	}

	/**
	 * @param zzServeQty09 the zzServeQty09 to set
	 */
	public void setZzServeQty09(String zzServeQty09) {
		this.zzServeQty09 = zzServeQty09;
	}

	/**
	 * @return the zzServeUom09
	 */
	public String getZzServeUom09() {
		return zzServeUom09;
	}

	/**
	 * @param zzServeUom09 the zzServeUom09 to set
	 */
	public void setZzServeUom09(String zzServeUom09) {
		this.zzServeUom09 = zzServeUom09;
	}

	/**
	 * @return the zzPer100Qty09
	 */
	public String getZzPer100Qty09() {
		return zzPer100Qty09;
	}

	/**
	 * @param zzPer100Qty09 the zzPer100Qty09 to set
	 */
	public void setZzPer100Qty09(String zzPer100Qty09) {
		this.zzPer100Qty09 = zzPer100Qty09;
	}

	/**
	 * @return the zzPer100Uom09
	 */
	public String getZzPer100Uom09() {
		return zzPer100Uom09;
	}

	/**
	 * @param zzPer100Uom09 the zzPer100Uom09 to set
	 */
	public void setZzPer100Uom09(String zzPer100Uom09) {
		this.zzPer100Uom09 = zzPer100Uom09;
	}

	/**
	 * @return the zzNutrient10
	 */
	public String getZzNutrient10() {
		return zzNutrient10;
	}

	/**
	 * @param zzNutrient10 the zzNutrient10 to set
	 */
	public void setZzNutrient10(String zzNutrient10) {
		this.zzNutrient10 = zzNutrient10;
	}

	/**
	 * @return the zzServeQty10
	 */
	public String getZzServeQty10() {
		return zzServeQty10;
	}

	/**
	 * @param zzServeQty10 the zzServeQty10 to set
	 */
	public void setZzServeQty10(String zzServeQty10) {
		this.zzServeQty10 = zzServeQty10;
	}

	/**
	 * @return the zzServeUom10
	 */
	public String getZzServeUom10() {
		return zzServeUom10;
	}

	/**
	 * @param zzServeUom10 the zzServeUom10 to set
	 */
	public void setZzServeUom10(String zzServeUom10) {
		this.zzServeUom10 = zzServeUom10;
	}

	/**
	 * @return the zzPer100Qty10
	 */
	public String getZzPer100Qty10() {
		return zzPer100Qty10;
	}

	/**
	 * @param zzPer100Qty10 the zzPer100Qty10 to set
	 */
	public void setZzPer100Qty10(String zzPer100Qty10) {
		this.zzPer100Qty10 = zzPer100Qty10;
	}

	/**
	 * @return the zzPer100Uom10
	 */
	public String getZzPer100Uom10() {
		return zzPer100Uom10;
	}

	/**
	 * @param zzPer100Uom10 the zzPer100Uom10 to set
	 */
	public void setZzPer100Uom10(String zzPer100Uom10) {
		this.zzPer100Uom10 = zzPer100Uom10;
	}

	/**
	 * @return the zzNutrient11
	 */
	public String getZzNutrient11() {
		return zzNutrient11;
	}

	/**
	 * @param zzNutrient11 the zzNutrient11 to set
	 */
	public void setZzNutrient11(String zzNutrient11) {
		this.zzNutrient11 = zzNutrient11;
	}

	/**
	 * @return the zzServeQty11
	 */
	public String getZzServeQty11() {
		return zzServeQty11;
	}

	/**
	 * @param zzServeQty11 the zzServeQty11 to set
	 */
	public void setZzServeQty11(String zzServeQty11) {
		this.zzServeQty11 = zzServeQty11;
	}

	/**
	 * @return the zzServeUom11
	 */
	public String getZzServeUom11() {
		return zzServeUom11;
	}

	/**
	 * @param zzServeUom11 the zzServeUom11 to set
	 */
	public void setZzServeUom11(String zzServeUom11) {
		this.zzServeUom11 = zzServeUom11;
	}

	/**
	 * @return the zzPer100Qty11
	 */
	public String getZzPer100Qty11() {
		return zzPer100Qty11;
	}

	/**
	 * @param zzPer100Qty11 the zzPer100Qty11 to set
	 */
	public void setZzPer100Qty11(String zzPer100Qty11) {
		this.zzPer100Qty11 = zzPer100Qty11;
	}

	/**
	 * @return the zzPer100Uom11
	 */
	public String getZzPer100Uom11() {
		return zzPer100Uom11;
	}

	/**
	 * @param zzPer100Uom11 the zzPer100Uom11 to set
	 */
	public void setZzPer100Uom11(String zzPer100Uom11) {
		this.zzPer100Uom11 = zzPer100Uom11;
	}

	/**
	 * @return the zzNutrient12
	 */
	public String getZzNutrient12() {
		return zzNutrient12;
	}

	/**
	 * @param zzNutrient12 the zzNutrient12 to set
	 */
	public void setZzNutrient12(String zzNutrient12) {
		this.zzNutrient12 = zzNutrient12;
	}

	/**
	 * @return the zzServeQty12
	 */
	public String getZzServeQty12() {
		return zzServeQty12;
	}

	/**
	 * @param zzServeQty12 the zzServeQty12 to set
	 */
	public void setZzServeQty12(String zzServeQty12) {
		this.zzServeQty12 = zzServeQty12;
	}

	/**
	 * @return the zzServeUom12
	 */
	public String getZzServeUom12() {
		return zzServeUom12;
	}

	/**
	 * @param zzServeUom12 the zzServeUom12 to set
	 */
	public void setZzServeUom12(String zzServeUom12) {
		this.zzServeUom12 = zzServeUom12;
	}

	/**
	 * @return the zzPer100Qty12
	 */
	public String getZzPer100Qty12() {
		return zzPer100Qty12;
	}

	/**
	 * @param zzPer100Qty12 the zzPer100Qty12 to set
	 */
	public void setZzPer100Qty12(String zzPer100Qty12) {
		this.zzPer100Qty12 = zzPer100Qty12;
	}

	/**
	 * @return the zzPer100Uom12
	 */
	public String getZzPer100Uom12() {
		return zzPer100Uom12;
	}

	/**
	 * @param zzPer100Uom12 the zzPer100Uom12 to set
	 */
	public void setZzPer100Uom12(String zzPer100Uom12) {
		this.zzPer100Uom12 = zzPer100Uom12;
	}

	/**
	 * @return the zzNutrient13
	 */
	public String getZzNutrient13() {
		return zzNutrient13;
	}

	/**
	 * @param zzNutrient13 the zzNutrient13 to set
	 */
	public void setZzNutrient13(String zzNutrient13) {
		this.zzNutrient13 = zzNutrient13;
	}

	/**
	 * @return the zzServeQty13
	 */
	public String getZzServeQty13() {
		return zzServeQty13;
	}

	/**
	 * @param zzServeQty13 the zzServeQty13 to set
	 */
	public void setZzServeQty13(String zzServeQty13) {
		this.zzServeQty13 = zzServeQty13;
	}

	/**
	 * @return the zzServeUom13
	 */
	public String getZzServeUom13() {
		return zzServeUom13;
	}

	/**
	 * @param zzServeUom13 the zzServeUom13 to set
	 */
	public void setZzServeUom13(String zzServeUom13) {
		this.zzServeUom13 = zzServeUom13;
	}

	/**
	 * @return the zzPer100Qty13
	 */
	public String getZzPer100Qty13() {
		return zzPer100Qty13;
	}

	/**
	 * @param zzPer100Qty13 the zzPer100Qty13 to set
	 */
	public void setZzPer100Qty13(String zzPer100Qty13) {
		this.zzPer100Qty13 = zzPer100Qty13;
	}

	/**
	 * @return the zzPer100Uom13
	 */
	public String getZzPer100Uom13() {
		return zzPer100Uom13;
	}

	/**
	 * @param zzPer100Uom13 the zzPer100Uom13 to set
	 */
	public void setZzPer100Uom13(String zzPer100Uom13) {
		this.zzPer100Uom13 = zzPer100Uom13;
	}

	/**
	 * @return the zzNutrient14
	 */
	public String getZzNutrient14() {
		return zzNutrient14;
	}

	/**
	 * @param zzNutrient14 the zzNutrient14 to set
	 */
	public void setZzNutrient14(String zzNutrient14) {
		this.zzNutrient14 = zzNutrient14;
	}

	/**
	 * @return the zzServeQty14
	 */
	public String getZzServeQty14() {
		return zzServeQty14;
	}

	/**
	 * @param zzServeQty14 the zzServeQty14 to set
	 */
	public void setZzServeQty14(String zzServeQty14) {
		this.zzServeQty14 = zzServeQty14;
	}

	/**
	 * @return the zzServeUom14
	 */
	public String getZzServeUom14() {
		return zzServeUom14;
	}

	/**
	 * @param zzServeUom14 the zzServeUom14 to set
	 */
	public void setZzServeUom14(String zzServeUom14) {
		this.zzServeUom14 = zzServeUom14;
	}

	/**
	 * @return the zzPer100Qty14
	 */
	public String getZzPer100Qty14() {
		return zzPer100Qty14;
	}

	/**
	 * @param zzPer100Qty14 the zzPer100Qty14 to set
	 */
	public void setZzPer100Qty14(String zzPer100Qty14) {
		this.zzPer100Qty14 = zzPer100Qty14;
	}

	/**
	 * @return the zzPer100Uom14
	 */
	public String getZzPer100Uom14() {
		return zzPer100Uom14;
	}

	/**
	 * @param zzPer100Uom14 the zzPer100Uom14 to set
	 */
	public void setZzPer100Uom14(String zzPer100Uom14) {
		this.zzPer100Uom14 = zzPer100Uom14;
	}

	/**
	 * @return the zzProdIngrd01
	 */
	public String getZzProdIngrd01() {
		return zzProdIngrd01;
	}

	/**
	 * @param zzProdIngrd01 the zzProdIngrd01 to set
	 */
	public void setZzProdIngrd01(String zzProdIngrd01) {
		this.zzProdIngrd01 = zzProdIngrd01;
	}

	/**
	 * @return the zzProdIngrd02
	 */
	public String getZzProdIngrd02() {
		return zzProdIngrd02;
	}

	/**
	 * @param zzProdIngrd02 the zzProdIngrd02 to set
	 */
	public void setZzProdIngrd02(String zzProdIngrd02) {
		this.zzProdIngrd02 = zzProdIngrd02;
	}

	/**
	 * @return the zzProdIngrd03
	 */
	public String getZzProdIngrd03() {
		return zzProdIngrd03;
	}

	/**
	 * @param zzProdIngrd03 the zzProdIngrd03 to set
	 */
	public void setZzProdIngrd03(String zzProdIngrd03) {
		this.zzProdIngrd03 = zzProdIngrd03;
	}

	/**
	 * @return the zzProdIngrd04
	 */
	public String getZzProdIngrd04() {
		return zzProdIngrd04;
	}

	/**
	 * @param zzProdIngrd04 the zzProdIngrd04 to set
	 */
	public void setZzProdIngrd04(String zzProdIngrd04) {
		this.zzProdIngrd04 = zzProdIngrd04;
	}

	/**
	 * @return the zzProdIngrd05
	 */
	public String getZzProdIngrd05() {
		return zzProdIngrd05;
	}

	/**
	 * @param zzProdIngrd05 the zzProdIngrd05 to set
	 */
	public void setZzProdIngrd05(String zzProdIngrd05) {
		this.zzProdIngrd05 = zzProdIngrd05;
	}

	/**
	 * @return the zzProdIngrd06
	 */
	public String getZzProdIngrd06() {
		return zzProdIngrd06;
	}

	/**
	 * @param zzProdIngrd06 the zzProdIngrd06 to set
	 */
	public void setZzProdIngrd06(String zzProdIngrd06) {
		this.zzProdIngrd06 = zzProdIngrd06;
	}

	/**
	 * @return the zzProdIngrd07
	 */
	public String getZzProdIngrd07() {
		return zzProdIngrd07;
	}

	/**
	 * @param zzProdIngrd07 the zzProdIngrd07 to set
	 */
	public void setZzProdIngrd07(String zzProdIngrd07) {
		this.zzProdIngrd07 = zzProdIngrd07;
	}

	/**
	 * @return the zzProdIngrd08
	 */
	public String getZzProdIngrd08() {
		return zzProdIngrd08;
	}

	/**
	 * @param zzProdIngrd08 the zzProdIngrd08 to set
	 */
	public void setZzProdIngrd08(String zzProdIngrd08) {
		this.zzProdIngrd08 = zzProdIngrd08;
	}

	/**
	 * @return the zzProdIngrd09
	 */
	public String getZzProdIngrd09() {
		return zzProdIngrd09;
	}

	/**
	 * @param zzProdIngrd09 the zzProdIngrd09 to set
	 */
	public void setZzProdIngrd09(String zzProdIngrd09) {
		this.zzProdIngrd09 = zzProdIngrd09;
	}

	/**
	 * @return the zzProdIngrd10
	 */
	public String getZzProdIngrd10() {
		return zzProdIngrd10;
	}

	/**
	 * @param zzProdIngrd10 the zzProdIngrd10 to set
	 */
	public void setZzProdIngrd10(String zzProdIngrd10) {
		this.zzProdIngrd10 = zzProdIngrd10;
	}

	/**
	 * @return the zzProdIngrd11
	 */
	public String getZzProdIngrd11() {
		return zzProdIngrd11;
	}

	/**
	 * @param zzProdIngrd11 the zzProdIngrd11 to set
	 */
	public void setZzProdIngrd11(String zzProdIngrd11) {
		this.zzProdIngrd11 = zzProdIngrd11;
	}

	/**
	 * @return the zzProdIngrd12
	 */
	public String getZzProdIngrd12() {
		return zzProdIngrd12;
	}

	/**
	 * @param zzProdIngrd12 the zzProdIngrd12 to set
	 */
	public void setZzProdIngrd12(String zzProdIngrd12) {
		this.zzProdIngrd12 = zzProdIngrd12;
	}

	/**
	 * @return the zzProdIngrd13
	 */
	public String getZzProdIngrd13() {
		return zzProdIngrd13;
	}

	/**
	 * @param zzProdIngrd13 the zzProdIngrd13 to set
	 */
	public void setZzProdIngrd13(String zzProdIngrd13) {
		this.zzProdIngrd13 = zzProdIngrd13;
	}

	/**
	 * @return the zzProdIngrd14
	 */
	public String getZzProdIngrd14() {
		return zzProdIngrd14;
	}

	/**
	 * @param zzProdIngrd14 the zzProdIngrd14 to set
	 */
	public void setZzProdIngrd14(String zzProdIngrd14) {
		this.zzProdIngrd14 = zzProdIngrd14;
	}

	/**
	 * @return the zzProdIngrd15
	 */
	public String getZzProdIngrd15() {
		return zzProdIngrd15;
	}

	/**
	 * @param zzProdIngrd15 the zzProdIngrd15 to set
	 */
	public void setZzProdIngrd15(String zzProdIngrd15) {
		this.zzProdIngrd15 = zzProdIngrd15;
	}

	/**
	 * @return the zzProdIngrd16
	 */
	public String getZzProdIngrd16() {
		return zzProdIngrd16;
	}

	/**
	 * @param zzProdIngrd16 the zzProdIngrd16 to set
	 */
	public void setZzProdIngrd16(String zzProdIngrd16) {
		this.zzProdIngrd16 = zzProdIngrd16;
	}

	/**
	 * @return the zzProdIngrd17
	 */
	public String getZzProdIngrd17() {
		return zzProdIngrd17;
	}

	/**
	 * @param zzProdIngrd17 the zzProdIngrd17 to set
	 */
	public void setZzProdIngrd17(String zzProdIngrd17) {
		this.zzProdIngrd17 = zzProdIngrd17;
	}

	/**
	 * @return the zzProdIngrd18
	 */
	public String getZzProdIngrd18() {
		return zzProdIngrd18;
	}

	/**
	 * @param zzProdIngrd18 the zzProdIngrd18 to set
	 */
	public void setZzProdIngrd18(String zzProdIngrd18) {
		this.zzProdIngrd18 = zzProdIngrd18;
	}

	/**
	 * @return the zzChksumFfmsg
	 */
	public String getZzChksumFfmsg() {
		return zzChksumFfmsg;
	}

	/**
	 * @param zzChksumFfmsg the zzChksumFfmsg to set
	 */
	public void setZzChksumFfmsg(String zzChksumFfmsg) {
		this.zzChksumFfmsg = zzChksumFfmsg;
	}

	/**
	 * @return the zzChksumFfnip
	 */
	public String getZzChksumFfnip() {
		return zzChksumFfnip;
	}

	/**
	 * @param zzChksumFfnip the zzChksumFfnip to set
	 */
	public void setZzChksumFfnip(String zzChksumFfnip) {
		this.zzChksumFfnip = zzChksumFfnip;
	}

	/**
	 * @return the zzChksumFfnote
	 */
	public String getZzChksumFfnote() {
		return zzChksumFfnote;
	}

	/**
	 * @param zzChksumFfnote the zzChksumFfnote to set
	 */
	public void setZzChksumFfnote(String zzChksumFfnote) {
		this.zzChksumFfnote = zzChksumFfnote;
	}

	/**
	 * @return the zzChksumFrfood
	 */
	public String getZzChksumFrfood() {
		return zzChksumFrfood;
	}

	/**
	 * @param zzChksumFrfood the zzChksumFrfood to set
	 */
	public void setZzChksumFrfood(String zzChksumFrfood) {
		this.zzChksumFrfood = zzChksumFrfood;
	}

	/**
	 * @return the matnr_m
	 */
	public String getMatnr_m() {
		return matnr_m;
	}

	/**
	 * @param matnr_m the matnr_m to set
	 */
	public void setMatnr_m(String matnr_m) {
		this.matnr_m = matnr_m;
	}

	/**
	 * @return the zznipInitStat_m
	 */
	public String getZznipInitStat_m() {
		return zznipInitStat_m;
	}

	/**
	 * @param zznipInitStat_m the zznipInitStat_m to set
	 */
	public void setZznipInitStat_m(String zznipInitStat_m) {
		this.zznipInitStat_m = zznipInitStat_m;
	}

	/**
	 * @return the zzEffectiveDate_m
	 */
	public String getZzEffectiveDate_m() {
		return zzEffectiveDate_m;
	}

	/**
	 * @param zzEffectiveDate_m the zzEffectiveDate_m to set
	 */
	public void setZzEffectiveDate_m(String zzEffectiveDate_m) {
		this.zzEffectiveDate_m = zzEffectiveDate_m;
	}

	/**
	 * @return the zzApprovalStat_m
	 */
	public String getZzApprovalStat_m() {
		return zzApprovalStat_m;
	}

	/**
	 * @param zzApprovalStat_m the zzApprovalStat_m to set
	 */
	public void setZzApprovalStat_m(String zzApprovalStat_m) {
		this.zzApprovalStat_m = zzApprovalStat_m;
	}

	/**
	 * @return the zzHazardGoods_m
	 */
	public String getZzHazardGoods_m() {
		return zzHazardGoods_m;
	}

	/**
	 * @param zzHazardGoods_m the zzHazardGoods_m to set
	 */
	public void setZzHazardGoods_m(String zzHazardGoods_m) {
		this.zzHazardGoods_m = zzHazardGoods_m;
	}

	/**
	 * @return the zzHazUnitCode_m
	 */
	public String getZzHazUnitCode_m() {
		return zzHazUnitCode_m;
	}

	/**
	 * @param zzHazUnitCode_m the zzHazUnitCode_m to set
	 */
	public void setZzHazUnitCode_m(String zzHazUnitCode_m) {
		this.zzHazUnitCode_m = zzHazUnitCode_m;
	}

	/**
	 * @return the zzHazUnitVol_m
	 */
	public String getZzHazUnitVol_m() {
		return zzHazUnitVol_m;
	}

	/**
	 * @param zzHazUnitVol_m the zzHazUnitVol_m to set
	 */
	public void setZzHazUnitVol_m(String zzHazUnitVol_m) {
		this.zzHazUnitVol_m = zzHazUnitVol_m;
	}

	/**
	 * @return the zzHazardClass_m
	 */
	public String getZzHazardClass_m() {
		return zzHazardClass_m;
	}

	/**
	 * @param zzHazardClass_m the zzHazardClass_m to set
	 */
	public void setZzHazardClass_m(String zzHazardClass_m) {
		this.zzHazardClass_m = zzHazardClass_m;
	}

	/**
	 * @return the zzHazSubsidCde_m
	 */
	public String getZzHazSubsidCde_m() {
		return zzHazSubsidCde_m;
	}

	/**
	 * @param zzHazSubsidCde_m the zzHazSubsidCde_m to set
	 */
	public void setZzHazSubsidCde_m(String zzHazSubsidCde_m) {
		this.zzHazSubsidCde_m = zzHazSubsidCde_m;
	}

	/**
	 * @return the zzHazPackGroup_m
	 */
	public String getZzHazPackGroup_m() {
		return zzHazPackGroup_m;
	}

	/**
	 * @param zzHazPackGroup_m the zzHazPackGroup_m to set
	 */
	public void setZzHazPackGroup_m(String zzHazPackGroup_m) {
		this.zzHazPackGroup_m = zzHazPackGroup_m;
	}

	/**
	 * @return the zzOdourInd_m
	 */
	public String getZzOdourInd_m() {
		return zzOdourInd_m;
	}

	/**
	 * @param zzOdourInd_m the zzOdourInd_m to set
	 */
	public void setZzOdourInd_m(String zzOdourInd_m) {
		this.zzOdourInd_m = zzOdourInd_m;
	}

	/**
	 * @return the zzEthyleneInd_m
	 */
	public String getZzEthyleneInd_m() {
		return zzEthyleneInd_m;
	}

	/**
	 * @param zzEthyleneInd_m the zzEthyleneInd_m to set
	 */
	public void setZzEthyleneInd_m(String zzEthyleneInd_m) {
		this.zzEthyleneInd_m = zzEthyleneInd_m;
	}

	/**
	 * @return the zzTrayId_m
	 */
	public String getZzTrayId_m() {
		return zzTrayId_m;
	}

	/**
	 * @param zzTrayId_m the zzTrayId_m to set
	 */
	public void setZzTrayId_m(String zzTrayId_m) {
		this.zzTrayId_m = zzTrayId_m;
	}

	/**
	 * @return the zzSoakerQty_m
	 */
	public String getZzSoakerQty_m() {
		return zzSoakerQty_m;
	}

	/**
	 * @param zzSoakerQty_m the zzSoakerQty_m to set
	 */
	public void setZzSoakerQty_m(String zzSoakerQty_m) {
		this.zzSoakerQty_m = zzSoakerQty_m;
	}

	/**
	 * @return the zzWrapsQty_m
	 */
	public String getZzWrapsQty_m() {
		return zzWrapsQty_m;
	}

	/**
	 * @param zzWrapsQty_m the zzWrapsQty_m to set
	 */
	public void setZzWrapsQty_m(String zzWrapsQty_m) {
		this.zzWrapsQty_m = zzWrapsQty_m;
	}

	/**
	 * @return the zzLabelFormId_m
	 */
	public String getZzLabelFormId_m() {
		return zzLabelFormId_m;
	}

	/**
	 * @param zzLabelFormId_m the zzLabelFormId_m to set
	 */
	public void setZzLabelFormId_m(String zzLabelFormId_m) {
		this.zzLabelFormId_m = zzLabelFormId_m;
	}

	/**
	 * @return the zzLabelDesc1_m
	 */
	public String getZzLabelDesc1_m() {
		return zzLabelDesc1_m;
	}

	/**
	 * @param zzLabelDesc1_m the zzLabelDesc1_m to set
	 */
	public void setZzLabelDesc1_m(String zzLabelDesc1_m) {
		this.zzLabelDesc1_m = zzLabelDesc1_m;
	}

	/**
	 * @return the zzLabelDesc2_m
	 */
	public String getZzLabelDesc2_m() {
		return zzLabelDesc2_m;
	}

	/**
	 * @param zzLabelDesc2_m the zzLabelDesc2_m to set
	 */
	public void setZzLabelDesc2_m(String zzLabelDesc2_m) {
		this.zzLabelDesc2_m = zzLabelDesc2_m;
	}

	/**
	 * @return the zzPrntPackDat_m
	 */
	public String getZzPrntPackDat_m() {
		return zzPrntPackDat_m;
	}

	/**
	 * @param zzPrntPackDat_m the zzPrntPackDat_m to set
	 */
	public void setZzPrntPackDat_m(String zzPrntPackDat_m) {
		this.zzPrntPackDat_m = zzPrntPackDat_m;
	}

	/**
	 * @return the zzPrntPackTim_m
	 */
	public String getZzPrntPackTim_m() {
		return zzPrntPackTim_m;
	}

	/**
	 * @param zzPrntPackTim_m the zzPrntPackTim_m to set
	 */
	public void setZzPrntPackTim_m(String zzPrntPackTim_m) {
		this.zzPrntPackTim_m = zzPrntPackTim_m;
	}

	/**
	 * @return the zzPiUom_m
	 */
	public String getZzPiUom_m() {
		return zzPiUom_m;
	}

	/**
	 * @param zzPiUom_m the zzPiUom_m to set
	 */
	public void setZzPiUom_m(String zzPiUom_m) {
		this.zzPiUom_m = zzPiUom_m;
	}

	/**
	 * @return the zzTareCode_m
	 */
	public String getZzTareCode_m() {
		return zzTareCode_m;
	}

	/**
	 * @param zzTareCode_m the zzTareCode_m to set
	 */
	public void setZzTareCode_m(String zzTareCode_m) {
		this.zzTareCode_m = zzTareCode_m;
	}

	/**
	 * @return the zzScaleArticle_m
	 */
	public String getZzScaleArticle_m() {
		return zzScaleArticle_m;
	}

	/**
	 * @param zzScaleArticle_m the zzScaleArticle_m to set
	 */
	public void setZzScaleArticle_m(String zzScaleArticle_m) {
		this.zzScaleArticle_m = zzScaleArticle_m;
	}

	/**
	 * @return the zzMandWarning_m
	 */
	public String getZzMandWarning_m() {
		return zzMandWarning_m;
	}

	/**
	 * @param zzMandWarning_m the zzMandWarning_m to set
	 */
	public void setZzMandWarning_m(String zzMandWarning_m) {
		this.zzMandWarning_m = zzMandWarning_m;
	}

	/**
	 * @return the zzNutritionClm_m
	 */
	public String getZzNutritionClm_m() {
		return zzNutritionClm_m;
	}

	/**
	 * @param zzNutritionClm_m the zzNutritionClm_m to set
	 */
	public void setZzNutritionClm_m(String zzNutritionClm_m) {
		this.zzNutritionClm_m = zzNutritionClm_m;
	}

	/**
	 * @return the zzStrgReqmnt_m
	 */
	public String getZzStrgReqmnt_m() {
		return zzStrgReqmnt_m;
	}

	/**
	 * @param zzStrgReqmnt_m the zzStrgReqmnt_m to set
	 */
	public void setZzStrgReqmnt_m(String zzStrgReqmnt_m) {
		this.zzStrgReqmnt_m = zzStrgReqmnt_m;
	}

	/**
	 * @return the zzCountryOrign_m
	 */
	public String getZzCountryOrign_m() {
		return zzCountryOrign_m;
	}

	/**
	 * @param zzCountryOrign_m the zzCountryOrign_m to set
	 */
	public void setZzCountryOrign_m(String zzCountryOrign_m) {
		this.zzCountryOrign_m = zzCountryOrign_m;
	}

	/**
	 * @return the zzSrvPerPack_m
	 */
	public String getZzSrvPerPack_m() {
		return zzSrvPerPack_m;
	}

	/**
	 * @param zzSrvPerPack_m the zzSrvPerPack_m to set
	 */
	public void setZzSrvPerPack_m(String zzSrvPerPack_m) {
		this.zzSrvPerPack_m = zzSrvPerPack_m;
	}

	/**
	 * @return the zzSrvSize_m
	 */
	public String getZzSrvSize_m() {
		return zzSrvSize_m;
	}

	/**
	 * @param zzSrvSize_m the zzSrvSize_m to set
	 */
	public void setZzSrvSize_m(String zzSrvSize_m) {
		this.zzSrvSize_m = zzSrvSize_m;
	}

	/**
	 * @return the zzSrvSizeUom_m
	 */
	public String getZzSrvSizeUom_m() {
		return zzSrvSizeUom_m;
	}

	/**
	 * @param zzSrvSizeUom_m the zzSrvSizeUom_m to set
	 */
	public void setZzSrvSizeUom_m(String zzSrvSizeUom_m) {
		this.zzSrvSizeUom_m = zzSrvSizeUom_m;
	}

	/**
	 * @return the wrapTare_m
	 */
	public String getWrapTare_m() {
		return wrapTare_m;
	}

	/**
	 * @param wrapTare_m the wrapTare_m to set
	 */
	public void setWrapTare_m(String wrapTare_m) {
		this.wrapTare_m = wrapTare_m;
	}

	/**
	 * @return the zzNutrient01_m
	 */
	public String getZzNutrient01_m() {
		return zzNutrient01_m;
	}

	/**
	 * @param zzNutrient01_m the zzNutrient01_m to set
	 */
	public void setZzNutrient01_m(String zzNutrient01_m) {
		this.zzNutrient01_m = zzNutrient01_m;
	}

	/**
	 * @return the zzServeQty01_m
	 */
	public String getZzServeQty01_m() {
		return zzServeQty01_m;
	}

	/**
	 * @param zzServeQty01_m the zzServeQty01_m to set
	 */
	public void setZzServeQty01_m(String zzServeQty01_m) {
		this.zzServeQty01_m = zzServeQty01_m;
	}

	/**
	 * @return the zzServeUom01_m
	 */
	public String getZzServeUom01_m() {
		return zzServeUom01_m;
	}

	/**
	 * @param zzServeUom01_m the zzServeUom01_m to set
	 */
	public void setZzServeUom01_m(String zzServeUom01_m) {
		this.zzServeUom01_m = zzServeUom01_m;
	}

	/**
	 * @return the zzPer100Qty01_m
	 */
	public String getZzPer100Qty01_m() {
		return zzPer100Qty01_m;
	}

	/**
	 * @param zzPer100Qty01_m the zzPer100Qty01_m to set
	 */
	public void setZzPer100Qty01_m(String zzPer100Qty01_m) {
		this.zzPer100Qty01_m = zzPer100Qty01_m;
	}

	/**
	 * @return the zzPer100Uom01_m
	 */
	public String getZzPer100Uom01_m() {
		return zzPer100Uom01_m;
	}

	/**
	 * @param zzPer100Uom01_m the zzPer100Uom01_m to set
	 */
	public void setZzPer100Uom01_m(String zzPer100Uom01_m) {
		this.zzPer100Uom01_m = zzPer100Uom01_m;
	}

	/**
	 * @return the zzNutrient02_m
	 */
	public String getZzNutrient02_m() {
		return zzNutrient02_m;
	}

	/**
	 * @param zzNutrient02_m the zzNutrient02_m to set
	 */
	public void setZzNutrient02_m(String zzNutrient02_m) {
		this.zzNutrient02_m = zzNutrient02_m;
	}

	/**
	 * @return the zzServeQty02_m
	 */
	public String getZzServeQty02_m() {
		return zzServeQty02_m;
	}

	/**
	 * @param zzServeQty02_m the zzServeQty02_m to set
	 */
	public void setZzServeQty02_m(String zzServeQty02_m) {
		this.zzServeQty02_m = zzServeQty02_m;
	}

	/**
	 * @return the zzServeUom02_m
	 */
	public String getZzServeUom02_m() {
		return zzServeUom02_m;
	}

	/**
	 * @param zzServeUom02_m the zzServeUom02_m to set
	 */
	public void setZzServeUom02_m(String zzServeUom02_m) {
		this.zzServeUom02_m = zzServeUom02_m;
	}

	/**
	 * @return the zzPer100Qty02_m
	 */
	public String getZzPer100Qty02_m() {
		return zzPer100Qty02_m;
	}

	/**
	 * @param zzPer100Qty02_m the zzPer100Qty02_m to set
	 */
	public void setZzPer100Qty02_m(String zzPer100Qty02_m) {
		this.zzPer100Qty02_m = zzPer100Qty02_m;
	}

	/**
	 * @return the zzPer100Uom02_m
	 */
	public String getZzPer100Uom02_m() {
		return zzPer100Uom02_m;
	}

	/**
	 * @param zzPer100Uom02_m the zzPer100Uom02_m to set
	 */
	public void setZzPer100Uom02_m(String zzPer100Uom02_m) {
		this.zzPer100Uom02_m = zzPer100Uom02_m;
	}

	/**
	 * @return the zzNutrient03_m
	 */
	public String getZzNutrient03_m() {
		return zzNutrient03_m;
	}

	/**
	 * @param zzNutrient03_m the zzNutrient03_m to set
	 */
	public void setZzNutrient03_m(String zzNutrient03_m) {
		this.zzNutrient03_m = zzNutrient03_m;
	}

	/**
	 * @return the zzServeQty03_m
	 */
	public String getZzServeQty03_m() {
		return zzServeQty03_m;
	}

	/**
	 * @param zzServeQty03_m the zzServeQty03_m to set
	 */
	public void setZzServeQty03_m(String zzServeQty03_m) {
		this.zzServeQty03_m = zzServeQty03_m;
	}

	/**
	 * @return the zzServeUom03_m
	 */
	public String getZzServeUom03_m() {
		return zzServeUom03_m;
	}

	/**
	 * @param zzServeUom03_m the zzServeUom03_m to set
	 */
	public void setZzServeUom03_m(String zzServeUom03_m) {
		this.zzServeUom03_m = zzServeUom03_m;
	}

	/**
	 * @return the zzPer100Qty03_m
	 */
	public String getZzPer100Qty03_m() {
		return zzPer100Qty03_m;
	}

	/**
	 * @param zzPer100Qty03_m the zzPer100Qty03_m to set
	 */
	public void setZzPer100Qty03_m(String zzPer100Qty03_m) {
		this.zzPer100Qty03_m = zzPer100Qty03_m;
	}

	/**
	 * @return the zzPer100Uom03_m
	 */
	public String getZzPer100Uom03_m() {
		return zzPer100Uom03_m;
	}

	/**
	 * @param zzPer100Uom03_m the zzPer100Uom03_m to set
	 */
	public void setZzPer100Uom03_m(String zzPer100Uom03_m) {
		this.zzPer100Uom03_m = zzPer100Uom03_m;
	}

	/**
	 * @return the zzNutrient04_m
	 */
	public String getZzNutrient04_m() {
		return zzNutrient04_m;
	}

	/**
	 * @param zzNutrient04_m the zzNutrient04_m to set
	 */
	public void setZzNutrient04_m(String zzNutrient04_m) {
		this.zzNutrient04_m = zzNutrient04_m;
	}

	/**
	 * @return the zzServeQty04_m
	 */
	public String getZzServeQty04_m() {
		return zzServeQty04_m;
	}

	/**
	 * @param zzServeQty04_m the zzServeQty04_m to set
	 */
	public void setZzServeQty04_m(String zzServeQty04_m) {
		this.zzServeQty04_m = zzServeQty04_m;
	}

	/**
	 * @return the zzServeUom04_m
	 */
	public String getZzServeUom04_m() {
		return zzServeUom04_m;
	}

	/**
	 * @param zzServeUom04_m the zzServeUom04_m to set
	 */
	public void setZzServeUom04_m(String zzServeUom04_m) {
		this.zzServeUom04_m = zzServeUom04_m;
	}

	/**
	 * @return the zzPer100Qty04_m
	 */
	public String getZzPer100Qty04_m() {
		return zzPer100Qty04_m;
	}

	/**
	 * @param zzPer100Qty04_m the zzPer100Qty04_m to set
	 */
	public void setZzPer100Qty04_m(String zzPer100Qty04_m) {
		this.zzPer100Qty04_m = zzPer100Qty04_m;
	}

	/**
	 * @return the zzPer100Uom04_m
	 */
	public String getZzPer100Uom04_m() {
		return zzPer100Uom04_m;
	}

	/**
	 * @param zzPer100Uom04_m the zzPer100Uom04_m to set
	 */
	public void setZzPer100Uom04_m(String zzPer100Uom04_m) {
		this.zzPer100Uom04_m = zzPer100Uom04_m;
	}

	/**
	 * @return the zzNutrient05_m
	 */
	public String getZzNutrient05_m() {
		return zzNutrient05_m;
	}

	/**
	 * @param zzNutrient05_m the zzNutrient05_m to set
	 */
	public void setZzNutrient05_m(String zzNutrient05_m) {
		this.zzNutrient05_m = zzNutrient05_m;
	}

	/**
	 * @return the zzServeQty05_m
	 */
	public String getZzServeQty05_m() {
		return zzServeQty05_m;
	}

	/**
	 * @param zzServeQty05_m the zzServeQty05_m to set
	 */
	public void setZzServeQty05_m(String zzServeQty05_m) {
		this.zzServeQty05_m = zzServeQty05_m;
	}

	/**
	 * @return the zzServeUom05_m
	 */
	public String getZzServeUom05_m() {
		return zzServeUom05_m;
	}

	/**
	 * @param zzServeUom05_m the zzServeUom05_m to set
	 */
	public void setZzServeUom05_m(String zzServeUom05_m) {
		this.zzServeUom05_m = zzServeUom05_m;
	}

	/**
	 * @return the zzPer100Qty05_m
	 */
	public String getZzPer100Qty05_m() {
		return zzPer100Qty05_m;
	}

	/**
	 * @param zzPer100Qty05_m the zzPer100Qty05_m to set
	 */
	public void setZzPer100Qty05_m(String zzPer100Qty05_m) {
		this.zzPer100Qty05_m = zzPer100Qty05_m;
	}

	/**
	 * @return the zzPer100Uom05_m
	 */
	public String getZzPer100Uom05_m() {
		return zzPer100Uom05_m;
	}

	/**
	 * @param zzPer100Uom05_m the zzPer100Uom05_m to set
	 */
	public void setZzPer100Uom05_m(String zzPer100Uom05_m) {
		this.zzPer100Uom05_m = zzPer100Uom05_m;
	}

	/**
	 * @return the zzNutrient06_m
	 */
	public String getZzNutrient06_m() {
		return zzNutrient06_m;
	}

	/**
	 * @param zzNutrient06_m the zzNutrient06_m to set
	 */
	public void setZzNutrient06_m(String zzNutrient06_m) {
		this.zzNutrient06_m = zzNutrient06_m;
	}

	/**
	 * @return the zzServeQty06_m
	 */
	public String getZzServeQty06_m() {
		return zzServeQty06_m;
	}

	/**
	 * @param zzServeQty06_m the zzServeQty06_m to set
	 */
	public void setZzServeQty06_m(String zzServeQty06_m) {
		this.zzServeQty06_m = zzServeQty06_m;
	}

	/**
	 * @return the zzServeUom06_m
	 */
	public String getZzServeUom06_m() {
		return zzServeUom06_m;
	}

	/**
	 * @param zzServeUom06_m the zzServeUom06_m to set
	 */
	public void setZzServeUom06_m(String zzServeUom06_m) {
		this.zzServeUom06_m = zzServeUom06_m;
	}

	/**
	 * @return the zzPer100Qty06_m
	 */
	public String getZzPer100Qty06_m() {
		return zzPer100Qty06_m;
	}

	/**
	 * @param zzPer100Qty06_m the zzPer100Qty06_m to set
	 */
	public void setZzPer100Qty06_m(String zzPer100Qty06_m) {
		this.zzPer100Qty06_m = zzPer100Qty06_m;
	}

	/**
	 * @return the zzPer100Uom06_m
	 */
	public String getZzPer100Uom06_m() {
		return zzPer100Uom06_m;
	}

	/**
	 * @param zzPer100Uom06_m the zzPer100Uom06_m to set
	 */
	public void setZzPer100Uom06_m(String zzPer100Uom06_m) {
		this.zzPer100Uom06_m = zzPer100Uom06_m;
	}

	/**
	 * @return the zzNutrient07_m
	 */
	public String getZzNutrient07_m() {
		return zzNutrient07_m;
	}

	/**
	 * @param zzNutrient07_m the zzNutrient07_m to set
	 */
	public void setZzNutrient07_m(String zzNutrient07_m) {
		this.zzNutrient07_m = zzNutrient07_m;
	}

	/**
	 * @return the zzServeQty07_m
	 */
	public String getZzServeQty07_m() {
		return zzServeQty07_m;
	}

	/**
	 * @param zzServeQty07_m the zzServeQty07_m to set
	 */
	public void setZzServeQty07_m(String zzServeQty07_m) {
		this.zzServeQty07_m = zzServeQty07_m;
	}

	/**
	 * @return the zzServeUom07_m
	 */
	public String getZzServeUom07_m() {
		return zzServeUom07_m;
	}

	/**
	 * @param zzServeUom07_m the zzServeUom07_m to set
	 */
	public void setZzServeUom07_m(String zzServeUom07_m) {
		this.zzServeUom07_m = zzServeUom07_m;
	}

	/**
	 * @return the zzPer100Qty07_m
	 */
	public String getZzPer100Qty07_m() {
		return zzPer100Qty07_m;
	}

	/**
	 * @param zzPer100Qty07_m the zzPer100Qty07_m to set
	 */
	public void setZzPer100Qty07_m(String zzPer100Qty07_m) {
		this.zzPer100Qty07_m = zzPer100Qty07_m;
	}

	/**
	 * @return the zzPer100Uom07_m
	 */
	public String getZzPer100Uom07_m() {
		return zzPer100Uom07_m;
	}

	/**
	 * @param zzPer100Uom07_m the zzPer100Uom07_m to set
	 */
	public void setZzPer100Uom07_m(String zzPer100Uom07_m) {
		this.zzPer100Uom07_m = zzPer100Uom07_m;
	}

	/**
	 * @return the zzNutrient08_m
	 */
	public String getZzNutrient08_m() {
		return zzNutrient08_m;
	}

	/**
	 * @param zzNutrient08_m the zzNutrient08_m to set
	 */
	public void setZzNutrient08_m(String zzNutrient08_m) {
		this.zzNutrient08_m = zzNutrient08_m;
	}

	/**
	 * @return the zzServeQty08_m
	 */
	public String getZzServeQty08_m() {
		return zzServeQty08_m;
	}

	/**
	 * @param zzServeQty08_m the zzServeQty08_m to set
	 */
	public void setZzServeQty08_m(String zzServeQty08_m) {
		this.zzServeQty08_m = zzServeQty08_m;
	}

	/**
	 * @return the zzServeUom08_m
	 */
	public String getZzServeUom08_m() {
		return zzServeUom08_m;
	}

	/**
	 * @param zzServeUom08_m the zzServeUom08_m to set
	 */
	public void setZzServeUom08_m(String zzServeUom08_m) {
		this.zzServeUom08_m = zzServeUom08_m;
	}

	/**
	 * @return the zzPer100Qty08_m
	 */
	public String getZzPer100Qty08_m() {
		return zzPer100Qty08_m;
	}

	/**
	 * @param zzPer100Qty08_m the zzPer100Qty08_m to set
	 */
	public void setZzPer100Qty08_m(String zzPer100Qty08_m) {
		this.zzPer100Qty08_m = zzPer100Qty08_m;
	}

	/**
	 * @return the zzPer100Uom08_m
	 */
	public String getZzPer100Uom08_m() {
		return zzPer100Uom08_m;
	}

	/**
	 * @param zzPer100Uom08_m the zzPer100Uom08_m to set
	 */
	public void setZzPer100Uom08_m(String zzPer100Uom08_m) {
		this.zzPer100Uom08_m = zzPer100Uom08_m;
	}

	/**
	 * @return the zzNutrient09_m
	 */
	public String getZzNutrient09_m() {
		return zzNutrient09_m;
	}

	/**
	 * @param zzNutrient09_m the zzNutrient09_m to set
	 */
	public void setZzNutrient09_m(String zzNutrient09_m) {
		this.zzNutrient09_m = zzNutrient09_m;
	}

	/**
	 * @return the zzServeQty09_m
	 */
	public String getZzServeQty09_m() {
		return zzServeQty09_m;
	}

	/**
	 * @param zzServeQty09_m the zzServeQty09_m to set
	 */
	public void setZzServeQty09_m(String zzServeQty09_m) {
		this.zzServeQty09_m = zzServeQty09_m;
	}

	/**
	 * @return the zzServeUom09_m
	 */
	public String getZzServeUom09_m() {
		return zzServeUom09_m;
	}

	/**
	 * @param zzServeUom09_m the zzServeUom09_m to set
	 */
	public void setZzServeUom09_m(String zzServeUom09_m) {
		this.zzServeUom09_m = zzServeUom09_m;
	}

	/**
	 * @return the zzPer100Qty09_m
	 */
	public String getZzPer100Qty09_m() {
		return zzPer100Qty09_m;
	}

	/**
	 * @param zzPer100Qty09_m the zzPer100Qty09_m to set
	 */
	public void setZzPer100Qty09_m(String zzPer100Qty09_m) {
		this.zzPer100Qty09_m = zzPer100Qty09_m;
	}

	/**
	 * @return the zzPer100Uom09_m
	 */
	public String getZzPer100Uom09_m() {
		return zzPer100Uom09_m;
	}

	/**
	 * @param zzPer100Uom09_m the zzPer100Uom09_m to set
	 */
	public void setZzPer100Uom09_m(String zzPer100Uom09_m) {
		this.zzPer100Uom09_m = zzPer100Uom09_m;
	}

	/**
	 * @return the zzNutrient10_m
	 */
	public String getZzNutrient10_m() {
		return zzNutrient10_m;
	}

	/**
	 * @param zzNutrient10_m the zzNutrient10_m to set
	 */
	public void setZzNutrient10_m(String zzNutrient10_m) {
		this.zzNutrient10_m = zzNutrient10_m;
	}

	/**
	 * @return the zzServeQty10_m
	 */
	public String getZzServeQty10_m() {
		return zzServeQty10_m;
	}

	/**
	 * @param zzServeQty10_m the zzServeQty10_m to set
	 */
	public void setZzServeQty10_m(String zzServeQty10_m) {
		this.zzServeQty10_m = zzServeQty10_m;
	}

	/**
	 * @return the zzServeUom10_m
	 */
	public String getZzServeUom10_m() {
		return zzServeUom10_m;
	}

	/**
	 * @param zzServeUom10_m the zzServeUom10_m to set
	 */
	public void setZzServeUom10_m(String zzServeUom10_m) {
		this.zzServeUom10_m = zzServeUom10_m;
	}

	/**
	 * @return the zzPer100Qty10_m
	 */
	public String getZzPer100Qty10_m() {
		return zzPer100Qty10_m;
	}

	/**
	 * @param zzPer100Qty10_m the zzPer100Qty10_m to set
	 */
	public void setZzPer100Qty10_m(String zzPer100Qty10_m) {
		this.zzPer100Qty10_m = zzPer100Qty10_m;
	}

	/**
	 * @return the zzPer100Uom10_m
	 */
	public String getZzPer100Uom10_m() {
		return zzPer100Uom10_m;
	}

	/**
	 * @param zzPer100Uom10_m the zzPer100Uom10_m to set
	 */
	public void setZzPer100Uom10_m(String zzPer100Uom10_m) {
		this.zzPer100Uom10_m = zzPer100Uom10_m;
	}

	/**
	 * @return the zzNutrient11_m
	 */
	public String getZzNutrient11_m() {
		return zzNutrient11_m;
	}

	/**
	 * @param zzNutrient11_m the zzNutrient11_m to set
	 */
	public void setZzNutrient11_m(String zzNutrient11_m) {
		this.zzNutrient11_m = zzNutrient11_m;
	}

	/**
	 * @return the zzServeQty11_m
	 */
	public String getZzServeQty11_m() {
		return zzServeQty11_m;
	}

	/**
	 * @param zzServeQty11_m the zzServeQty11_m to set
	 */
	public void setZzServeQty11_m(String zzServeQty11_m) {
		this.zzServeQty11_m = zzServeQty11_m;
	}

	/**
	 * @return the zzServeUom11_m
	 */
	public String getZzServeUom11_m() {
		return zzServeUom11_m;
	}

	/**
	 * @param zzServeUom11_m the zzServeUom11_m to set
	 */
	public void setZzServeUom11_m(String zzServeUom11_m) {
		this.zzServeUom11_m = zzServeUom11_m;
	}

	/**
	 * @return the zzPer100Qty11_m
	 */
	public String getZzPer100Qty11_m() {
		return zzPer100Qty11_m;
	}

	/**
	 * @param zzPer100Qty11_m the zzPer100Qty11_m to set
	 */
	public void setZzPer100Qty11_m(String zzPer100Qty11_m) {
		this.zzPer100Qty11_m = zzPer100Qty11_m;
	}

	/**
	 * @return the zzPer100Uom11_m
	 */
	public String getZzPer100Uom11_m() {
		return zzPer100Uom11_m;
	}

	/**
	 * @param zzPer100Uom11_m the zzPer100Uom11_m to set
	 */
	public void setZzPer100Uom11_m(String zzPer100Uom11_m) {
		this.zzPer100Uom11_m = zzPer100Uom11_m;
	}

	/**
	 * @return the zzNutrient12_m
	 */
	public String getZzNutrient12_m() {
		return zzNutrient12_m;
	}

	/**
	 * @param zzNutrient12_m the zzNutrient12_m to set
	 */
	public void setZzNutrient12_m(String zzNutrient12_m) {
		this.zzNutrient12_m = zzNutrient12_m;
	}

	/**
	 * @return the zzServeQty12_m
	 */
	public String getZzServeQty12_m() {
		return zzServeQty12_m;
	}

	/**
	 * @param zzServeQty12_m the zzServeQty12_m to set
	 */
	public void setZzServeQty12_m(String zzServeQty12_m) {
		this.zzServeQty12_m = zzServeQty12_m;
	}

	/**
	 * @return the zzServeUom12_m
	 */
	public String getZzServeUom12_m() {
		return zzServeUom12_m;
	}

	/**
	 * @param zzServeUom12_m the zzServeUom12_m to set
	 */
	public void setZzServeUom12_m(String zzServeUom12_m) {
		this.zzServeUom12_m = zzServeUom12_m;
	}

	/**
	 * @return the zzPer100Qty12_m
	 */
	public String getZzPer100Qty12_m() {
		return zzPer100Qty12_m;
	}

	/**
	 * @param zzPer100Qty12_m the zzPer100Qty12_m to set
	 */
	public void setZzPer100Qty12_m(String zzPer100Qty12_m) {
		this.zzPer100Qty12_m = zzPer100Qty12_m;
	}

	/**
	 * @return the zzPer100Uom12_m
	 */
	public String getZzPer100Uom12_m() {
		return zzPer100Uom12_m;
	}

	/**
	 * @param zzPer100Uom12_m the zzPer100Uom12_m to set
	 */
	public void setZzPer100Uom12_m(String zzPer100Uom12_m) {
		this.zzPer100Uom12_m = zzPer100Uom12_m;
	}

	/**
	 * @return the zzNutrient13_m
	 */
	public String getZzNutrient13_m() {
		return zzNutrient13_m;
	}

	/**
	 * @param zzNutrient13_m the zzNutrient13_m to set
	 */
	public void setZzNutrient13_m(String zzNutrient13_m) {
		this.zzNutrient13_m = zzNutrient13_m;
	}

	/**
	 * @return the zzServeQty13_m
	 */
	public String getZzServeQty13_m() {
		return zzServeQty13_m;
	}

	/**
	 * @param zzServeQty13_m the zzServeQty13_m to set
	 */
	public void setZzServeQty13_m(String zzServeQty13_m) {
		this.zzServeQty13_m = zzServeQty13_m;
	}

	/**
	 * @return the zzServeUom13_m
	 */
	public String getZzServeUom13_m() {
		return zzServeUom13_m;
	}

	/**
	 * @param zzServeUom13_m the zzServeUom13_m to set
	 */
	public void setZzServeUom13_m(String zzServeUom13_m) {
		this.zzServeUom13_m = zzServeUom13_m;
	}

	/**
	 * @return the zzPer100Qty13_m
	 */
	public String getZzPer100Qty13_m() {
		return zzPer100Qty13_m;
	}

	/**
	 * @param zzPer100Qty13_m the zzPer100Qty13_m to set
	 */
	public void setZzPer100Qty13_m(String zzPer100Qty13_m) {
		this.zzPer100Qty13_m = zzPer100Qty13_m;
	}

	/**
	 * @return the zzPer100Uom13_m
	 */
	public String getZzPer100Uom13_m() {
		return zzPer100Uom13_m;
	}

	/**
	 * @param zzPer100Uom13_m the zzPer100Uom13_m to set
	 */
	public void setZzPer100Uom13_m(String zzPer100Uom13_m) {
		this.zzPer100Uom13_m = zzPer100Uom13_m;
	}

	/**
	 * @return the zzNutrient14_m
	 */
	public String getZzNutrient14_m() {
		return zzNutrient14_m;
	}

	/**
	 * @param zzNutrient14_m the zzNutrient14_m to set
	 */
	public void setZzNutrient14_m(String zzNutrient14_m) {
		this.zzNutrient14_m = zzNutrient14_m;
	}

	/**
	 * @return the zzServeQty14_m
	 */
	public String getZzServeQty14_m() {
		return zzServeQty14_m;
	}

	/**
	 * @param zzServeQty14_m the zzServeQty14_m to set
	 */
	public void setZzServeQty14_m(String zzServeQty14_m) {
		this.zzServeQty14_m = zzServeQty14_m;
	}

	/**
	 * @return the zzServeUom14_m
	 */
	public String getZzServeUom14_m() {
		return zzServeUom14_m;
	}

	/**
	 * @param zzServeUom14_m the zzServeUom14_m to set
	 */
	public void setZzServeUom14_m(String zzServeUom14_m) {
		this.zzServeUom14_m = zzServeUom14_m;
	}

	/**
	 * @return the zzPer100Qty14_m
	 */
	public String getZzPer100Qty14_m() {
		return zzPer100Qty14_m;
	}

	/**
	 * @param zzPer100Qty14_m the zzPer100Qty14_m to set
	 */
	public void setZzPer100Qty14_m(String zzPer100Qty14_m) {
		this.zzPer100Qty14_m = zzPer100Qty14_m;
	}

	/**
	 * @return the zzPer100Uom14_m
	 */
	public String getZzPer100Uom14_m() {
		return zzPer100Uom14_m;
	}

	/**
	 * @param zzPer100Uom14_m the zzPer100Uom14_m to set
	 */
	public void setZzPer100Uom14_m(String zzPer100Uom14_m) {
		this.zzPer100Uom14_m = zzPer100Uom14_m;
	}

	/**
	 * @return the zzProdIngrd01_m
	 */
	public String getZzProdIngrd01_m() {
		return zzProdIngrd01_m;
	}

	/**
	 * @param zzProdIngrd01_m the zzProdIngrd01_m to set
	 */
	public void setZzProdIngrd01_m(String zzProdIngrd01_m) {
		this.zzProdIngrd01_m = zzProdIngrd01_m;
	}

	/**
	 * @return the zzProdIngrd02_m
	 */
	public String getZzProdIngrd02_m() {
		return zzProdIngrd02_m;
	}

	/**
	 * @param zzProdIngrd02_m the zzProdIngrd02_m to set
	 */
	public void setZzProdIngrd02_m(String zzProdIngrd02_m) {
		this.zzProdIngrd02_m = zzProdIngrd02_m;
	}

	/**
	 * @return the zzProdIngrd03_m
	 */
	public String getZzProdIngrd03_m() {
		return zzProdIngrd03_m;
	}

	/**
	 * @param zzProdIngrd03_m the zzProdIngrd03_m to set
	 */
	public void setZzProdIngrd03_m(String zzProdIngrd03_m) {
		this.zzProdIngrd03_m = zzProdIngrd03_m;
	}

	/**
	 * @return the zzProdIngrd04_m
	 */
	public String getZzProdIngrd04_m() {
		return zzProdIngrd04_m;
	}

	/**
	 * @param zzProdIngrd04_m the zzProdIngrd04_m to set
	 */
	public void setZzProdIngrd04_m(String zzProdIngrd04_m) {
		this.zzProdIngrd04_m = zzProdIngrd04_m;
	}

	/**
	 * @return the zzProdIngrd05_m
	 */
	public String getZzProdIngrd05_m() {
		return zzProdIngrd05_m;
	}

	/**
	 * @param zzProdIngrd05_m the zzProdIngrd05_m to set
	 */
	public void setZzProdIngrd05_m(String zzProdIngrd05_m) {
		this.zzProdIngrd05_m = zzProdIngrd05_m;
	}

	/**
	 * @return the zzProdIngrd06_m
	 */
	public String getZzProdIngrd06_m() {
		return zzProdIngrd06_m;
	}

	/**
	 * @param zzProdIngrd06_m the zzProdIngrd06_m to set
	 */
	public void setZzProdIngrd06_m(String zzProdIngrd06_m) {
		this.zzProdIngrd06_m = zzProdIngrd06_m;
	}

	/**
	 * @return the zzProdIngrd07_m
	 */
	public String getZzProdIngrd07_m() {
		return zzProdIngrd07_m;
	}

	/**
	 * @param zzProdIngrd07_m the zzProdIngrd07_m to set
	 */
	public void setZzProdIngrd07_m(String zzProdIngrd07_m) {
		this.zzProdIngrd07_m = zzProdIngrd07_m;
	}

	/**
	 * @return the zzProdIngrd08_m
	 */
	public String getZzProdIngrd08_m() {
		return zzProdIngrd08_m;
	}

	/**
	 * @param zzProdIngrd08_m the zzProdIngrd08_m to set
	 */
	public void setZzProdIngrd08_m(String zzProdIngrd08_m) {
		this.zzProdIngrd08_m = zzProdIngrd08_m;
	}

	/**
	 * @return the zzProdIngrd09_m
	 */
	public String getZzProdIngrd09_m() {
		return zzProdIngrd09_m;
	}

	/**
	 * @param zzProdIngrd09_m the zzProdIngrd09_m to set
	 */
	public void setZzProdIngrd09_m(String zzProdIngrd09_m) {
		this.zzProdIngrd09_m = zzProdIngrd09_m;
	}

	/**
	 * @return the zzProdIngrd10_m
	 */
	public String getZzProdIngrd10_m() {
		return zzProdIngrd10_m;
	}

	/**
	 * @param zzProdIngrd10_m the zzProdIngrd10_m to set
	 */
	public void setZzProdIngrd10_m(String zzProdIngrd10_m) {
		this.zzProdIngrd10_m = zzProdIngrd10_m;
	}

	/**
	 * @return the zzProdIngrd11_m
	 */
	public String getZzProdIngrd11_m() {
		return zzProdIngrd11_m;
	}

	/**
	 * @param zzProdIngrd11_m the zzProdIngrd11_m to set
	 */
	public void setZzProdIngrd11_m(String zzProdIngrd11_m) {
		this.zzProdIngrd11_m = zzProdIngrd11_m;
	}

	/**
	 * @return the zzProdIngrd12_m
	 */
	public String getZzProdIngrd12_m() {
		return zzProdIngrd12_m;
	}

	/**
	 * @param zzProdIngrd12_m the zzProdIngrd12_m to set
	 */
	public void setZzProdIngrd12_m(String zzProdIngrd12_m) {
		this.zzProdIngrd12_m = zzProdIngrd12_m;
	}

	/**
	 * @return the zzProdIngrd13_m
	 */
	public String getZzProdIngrd13_m() {
		return zzProdIngrd13_m;
	}

	/**
	 * @param zzProdIngrd13_m the zzProdIngrd13_m to set
	 */
	public void setZzProdIngrd13_m(String zzProdIngrd13_m) {
		this.zzProdIngrd13_m = zzProdIngrd13_m;
	}

	/**
	 * @return the zzProdIngrd14_m
	 */
	public String getZzProdIngrd14_m() {
		return zzProdIngrd14_m;
	}

	/**
	 * @param zzProdIngrd14_m the zzProdIngrd14_m to set
	 */
	public void setZzProdIngrd14_m(String zzProdIngrd14_m) {
		this.zzProdIngrd14_m = zzProdIngrd14_m;
	}

	/**
	 * @return the zzProdIngrd15_m
	 */
	public String getZzProdIngrd15_m() {
		return zzProdIngrd15_m;
	}

	/**
	 * @param zzProdIngrd15_m the zzProdIngrd15_m to set
	 */
	public void setZzProdIngrd15_m(String zzProdIngrd15_m) {
		this.zzProdIngrd15_m = zzProdIngrd15_m;
	}

	/**
	 * @return the zzProdIngrd16_m
	 */
	public String getZzProdIngrd16_m() {
		return zzProdIngrd16_m;
	}

	/**
	 * @param zzProdIngrd16_m the zzProdIngrd16_m to set
	 */
	public void setZzProdIngrd16_m(String zzProdIngrd16_m) {
		this.zzProdIngrd16_m = zzProdIngrd16_m;
	}

	/**
	 * @return the zzProdIngrd17_m
	 */
	public String getZzProdIngrd17_m() {
		return zzProdIngrd17_m;
	}

	/**
	 * @param zzProdIngrd17_m the zzProdIngrd17_m to set
	 */
	public void setZzProdIngrd17_m(String zzProdIngrd17_m) {
		this.zzProdIngrd17_m = zzProdIngrd17_m;
	}

	/**
	 * @return the zzProdIngrd18_m
	 */
	public String getZzProdIngrd18_m() {
		return zzProdIngrd18_m;
	}

	/**
	 * @param zzProdIngrd18_m the zzProdIngrd18_m to set
	 */
	public void setZzProdIngrd18_m(String zzProdIngrd18_m) {
		this.zzProdIngrd18_m = zzProdIngrd18_m;
	}

	/**
	 * @return the zzChksumFfmsg_m
	 */
	public String getZzChksumFfmsg_m() {
		return zzChksumFfmsg_m;
	}

	/**
	 * @param zzChksumFfmsg_m the zzChksumFfmsg_m to set
	 */
	public void setZzChksumFfmsg_m(String zzChksumFfmsg_m) {
		this.zzChksumFfmsg_m = zzChksumFfmsg_m;
	}

	/**
	 * @return the zzChksumFfnip_m
	 */
	public String getZzChksumFfnip_m() {
		return zzChksumFfnip_m;
	}

	/**
	 * @param zzChksumFfnip_m the zzChksumFfnip_m to set
	 */
	public void setZzChksumFfnip_m(String zzChksumFfnip_m) {
		this.zzChksumFfnip_m = zzChksumFfnip_m;
	}

	/**
	 * @return the zzChksumFfnote_m
	 */
	public String getZzChksumFfnote_m() {
		return zzChksumFfnote_m;
	}

	/**
	 * @param zzChksumFfnote_m the zzChksumFfnote_m to set
	 */
	public void setZzChksumFfnote_m(String zzChksumFfnote_m) {
		this.zzChksumFfnote_m = zzChksumFfnote_m;
	}

	/**
	 * @return the zzChksumFrfood_m
	 */
	public String getZzChksumFrfood_m() {
		return zzChksumFrfood_m;
	}

	/**
	 * @param zzChksumFrfood_m the zzChksumFrfood_m to set
	 */
	public void setZzChksumFrfood_m(String zzChksumFrfood_m) {
		this.zzChksumFrfood_m = zzChksumFrfood_m;
	}

}
