package au.com.woolworths.portal.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.util.Constants;

public class PwdEncryptDecryptService {


	private static final Logger LOGGER = Logger.getLogger(PwdEncryptDecryptService.class.getName());
	
	public static String encrypt(String pass) throws Exception 
    { 
		return pass;
		
		/*MessageDigest md =null;
		byte[] bytes =null;
		StringBuilder sb =null;
		
		try {
            // Create MessageDigest instance for MD5
             md = MessageDigest.getInstance("MD5");
            //Add password bytes to digest
            md.update(pass.getBytes());
            //Get the hash's bytes
            bytes = md.digest();
            //This bytes[] has bytes in decimal format;
            //Convert it to hexadecimal format
            sb = new StringBuilder();
            for(int i=0; i< bytes.length ;i++)
            {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            //Get complete hashed password in hex format
           
        }
		catch (NoSuchAlgorithmException e)
        {
            LOGGER.error("NoSuchAlgorithmException", e);
        }
		 return sb!=null? sb.toString():null;*/
        /*final MessageDigest md = MessageDigest.getInstance(Constants.ALGORITHM); 
        final byte[] digestOfPassword = md.digest(Constants.DIGEST_STRING.getBytes(Constants.CHARSET_UTF_8)); 
        final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24); 
        for (int j = 0, k = 16; j < 8;) { 
                keyBytes[k++] = keyBytes[j++]; 
        } 

        final SecretKey key = new SecretKeySpec(keyBytes, Constants.SECRET_KEY_ALGORITHM); 
        final IvParameterSpec iv = new IvParameterSpec(new byte[8]); 
        final Cipher cipher = Cipher.getInstance(Constants.TRANSFORMATION_PADDING); 
        cipher.init(Cipher.ENCRYPT_MODE, key, iv); 

        final byte[] passBytes = pass.getBytes(Constants.CHARSET_UTF_8); 
        final byte[] cipherText = cipher.doFinal(passBytes); 

        return new String(cipherText); */
    } 
    
   /* Decryption Method */
    public static String decrypt(String fromdbPass) throws Exception { 
    	//byte[] plainText=null;
        final MessageDigest md = MessageDigest.getInstance(Constants.ALGORITHM); 
        final byte[] digestOfPassword = md.digest(Constants.DIGEST_STRING.getBytes(Constants.CHARSET_UTF_8)); 
        final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24); 
        for (int j = 0, k = 16; j < 8;) { 
                keyBytes[k++] = keyBytes[j++]; 
        } 

        final SecretKey key = new SecretKeySpec(keyBytes, Constants.SECRET_KEY_ALGORITHM); 
        final IvParameterSpec iv = new IvParameterSpec(new byte[8]); 
        final Cipher decipher = Cipher.getInstance(Constants.TRANSFORMATION_PADDING); 
        decipher.init(Cipher.DECRYPT_MODE, key, iv); 
        
        //System.out.println("fromdbPass __ " +fromdbPass);
        try{
        	byte[] plainText = decipher.doFinal(fromdbPass.getBytes()); 
        	return plainText!=null ? new String( plainText, Constants.CHARSET_UTF_8):""; 
        }catch(Exception e){
        	e.printStackTrace();
        	
        }

        return ""; 
    }
}
